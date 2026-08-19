/* ============================================================
   Shared theme runtime for the LMS and CMS content scripts.
   Loaded first by both manifest entries; exposes window.LmsTheme
   inside the isolated content-script world.
   ============================================================ */
(function () {
  'use strict';

  var ROOT = document.documentElement;
  var MIRROR_KEY = 'lmsRedesign:theme';
  var DEFAULT_THEME = 'blue';

  // Callbacks the per-site scripts register to re-run their DOM tweaks
  // whenever the theme or dark mode changes.
  var listeners = [];

  /* ---------- synchronous mirror ----------------------------------------
     chrome.storage.sync is async, so at document_start the <html> element is
     unstyled for at least one frame. For a dark-mode user that frame is a
     white flash on every single page load.

     Content scripts share the page's localStorage, so we keep a mirror of the
     last known settings there and read it synchronously before the first
     paint. chrome.storage stays the source of truth and corrects the mirror
     as soon as it resolves. */

  function readMirror() {
    try {
      var raw = window.localStorage.getItem(MIRROR_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      // Private mode, disabled storage, or malformed JSON - fall back to async.
      return null;
    }
  }

  function writeMirror(darkMode, theme) {
    try {
      window.localStorage.setItem(
        MIRROR_KEY,
        JSON.stringify({ darkMode: !!darkMode, theme: theme || DEFAULT_THEME })
      );
    } catch (e) {
      /* nothing we can do, and nothing breaks without it */
    }
  }

  /* ---------- applying state -------------------------------------------- */

  function applyDark(enabled) {
    ROOT.classList.toggle('lms-dark', !!enabled);
  }

  function applyTheme(theme) {
    var next = theme || DEFAULT_THEME;
    // Snapshot first: classList is live, removing while iterating skips entries.
    Array.prototype.slice
      .call(ROOT.classList)
      .filter(function (cls) { return cls.indexOf('lms-theme-') === 0; })
      .forEach(function (cls) { ROOT.classList.remove(cls); });

    if (next !== DEFAULT_THEME) {
      ROOT.classList.add('lms-theme-' + next);
    }
  }

  function notify() {
    listeners.forEach(function (fn) {
      try {
        fn();
      } catch (e) {
        console.error('[LMS Redesign] theme listener failed:', e);
      }
    });
  }

  /* ---------- preload guard ---------------------------------------------
     css/theme.css disables every transition while `lms-preload` is set, so
     the styles that settle during boot land instantly instead of animating
     into place. We clear it one frame after the real settings arrive. */

  var preloadCleared = false;

  function clearPreload() {
    if (preloadCleared) return;
    preloadCleared = true;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        ROOT.classList.remove('lms-preload');
      });
    });
  }

  ROOT.classList.add('lms-preload');

  // Never leave the page frozen if storage misbehaves or never answers.
  setTimeout(clearPreload, 1500);

  /* ---------- boot ------------------------------------------------------- */

  var mirrored = readMirror();
  if (mirrored) {
    applyDark(mirrored.darkMode);
    applyTheme(mirrored.theme);
  }

  chrome.storage.sync.get(['darkMode', 'lmsTheme'], function (result) {
    if (chrome.runtime.lastError) {
      clearPreload();
      return;
    }
    var dark = !!result.darkMode;
    var theme = result.lmsTheme || DEFAULT_THEME;

    applyDark(dark);
    applyTheme(theme);
    writeMirror(dark, theme);
    notify();
    clearPreload();
  });

  /* ---------- popup messages --------------------------------------------- */

  chrome.runtime.onMessage.addListener(function (msg) {
    if (!msg || !msg.type) return;

    if (msg.type === 'toggleDark') {
      applyDark(msg.enabled);
      writeMirror(msg.enabled, currentTheme());
      notify();
    }

    if (msg.type === 'setTheme') {
      applyTheme(msg.theme);
      writeMirror(ROOT.classList.contains('lms-dark'), msg.theme);
      notify();
    }
  });

  function currentTheme() {
    var found = Array.prototype.slice
      .call(ROOT.classList)
      .filter(function (cls) { return cls.indexOf('lms-theme-') === 0; })[0];
    return found ? found.slice('lms-theme-'.length) : DEFAULT_THEME;
  }

  /* ---------- helpers for the per-site scripts --------------------------- */

  /* Coalesces bursts of calls into one per animation frame. The LMS/CMS pages
     mutate constantly (AdminLTE widgets, ASP.NET partial postbacks); running
     DOM fix-ups per mutation is what made theme changes stutter. */
  function rafDebounce(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        fn();
      });
    };
  }

  /* A MutationObserver whose callback writes to the DOM will re-trigger
     itself. This wrapper suspends observation for the duration of the write. */
  function selfHealingObserver(target, options, work) {
    var observer;
    var run = rafDebounce(function () {
      observer.disconnect();
      try {
        work();
      } finally {
        observer.observe(target, options);
      }
    });

    observer = new MutationObserver(run);
    observer.observe(target, options);
    return observer;
  }

  window.LmsTheme = {
    DEFAULT_THEME: DEFAULT_THEME,
    onChange: function (fn) { listeners.push(fn); },
    isDark: function () { return ROOT.classList.contains('lms-dark'); },
    currentTheme: currentTheme,
    rafDebounce: rafDebounce,
    selfHealingObserver: selfHealingObserver
  };
})();
