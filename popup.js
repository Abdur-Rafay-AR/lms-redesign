/* ============================================================
   Popup logic
   Reads and writes chrome.storage.sync, and pushes live updates to the
   active tab so changes land without a page reload.
   ============================================================ */
(function () {
  'use strict';

  /* The single source of truth for the theme list. The grid, the popup's own
     accent colour and the swatch gradients all come from here, so adding a
     theme means adding one row plus the matching block in css/theme.css. */
  var THEMES = [
    { id: 'blue',    name: 'Blue',       from: '#132a5b', to: '#2d4f8f', rgb: '19, 42, 91' },
    { id: 'crimson', name: 'Crimson',    from: '#dc2626', to: '#e11d48', rgb: '220, 38, 38' },
    { id: 'forest',  name: 'Forest',     from: '#16a34a', to: '#059669', rgb: '22, 163, 74' },
    { id: 'pink',    name: 'Baby Pink',  from: '#ec4899', to: '#f472b6', rgb: '236, 72, 153' },
    { id: 'mono',    name: 'Mono',       from: '#475569', to: '#64748b', rgb: '71, 85, 105' },
    { id: 'purple',  name: 'Purple',     from: '#7c3aed', to: '#8b5cf6', rgb: '124, 58, 237' },
    { id: 'teal',    name: 'Teal',       from: '#0d9488', to: '#14b8a6', rgb: '13, 148, 136' },
    { id: 'amber',   name: 'Amber',      from: '#d97706', to: '#f59e0b', rgb: '217, 119, 6' },
    { id: 'ocean',   name: 'Ocean',      from: '#3b82f6', to: '#06b6d4', rgb: '59, 130, 246' },
    { id: 'sage',    name: 'Sage',       from: '#556b2f', to: '#6f8f3d', rgb: '85, 107, 47' },
    { id: 'rose',    name: 'Rose',       from: '#be185d', to: '#e11d48', rgb: '190, 24, 93' },
    { id: 'dusk',    name: 'Dusk',       from: '#475569', to: '#6366f1', rgb: '71, 85, 105' }
  ];

  var DEFAULT_THEME = 'blue';

  var body = document.body;
  var darkToggle = document.getElementById('darkToggle');
  var themeGrid = document.getElementById('themeGrid');
  var status = document.getElementById('status');

  var swatches = [];
  var activeTheme = DEFAULT_THEME;

  /* ---------- rendering -------------------------------------------------- */

  function renderSwatches() {
    var fragment = document.createDocumentFragment();

    THEMES.forEach(function (theme) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'theme-swatch';
      button.dataset.theme = theme.id;
      button.title = theme.name;
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', 'false');

      var circle = document.createElement('span');
      circle.className = 'swatch-circle';
      circle.style.background = 'linear-gradient(135deg, ' + theme.from + ' 0%, ' + theme.to + ' 100%)';

      var label = document.createElement('span');
      label.className = 'swatch-name';
      label.textContent = theme.name;

      button.append(circle, label);
      button.addEventListener('click', function () { selectTheme(theme.id, true); });
      button.addEventListener('keydown', onGridKeydown);

      fragment.appendChild(button);
    });

    themeGrid.appendChild(fragment);
    swatches = Array.prototype.slice.call(themeGrid.children);
  }

  /* Arrow keys walk the 4-column grid, matching how a radio group is expected
     to behave. Only the selected swatch stays in the tab order. */
  function onGridKeydown(event) {
    var columns = 4;
    var index = swatches.indexOf(event.currentTarget);
    var next;

    switch (event.key) {
      case 'ArrowRight': next = index + 1; break;
      case 'ArrowLeft':  next = index - 1; break;
      case 'ArrowDown':  next = index + columns; break;
      case 'ArrowUp':    next = index - columns; break;
      case 'Home':       next = 0; break;
      case 'End':        next = swatches.length - 1; break;
      default: return;
    }

    if (next < 0 || next >= swatches.length) return;

    event.preventDefault();
    swatches[next].focus();
    selectTheme(swatches[next].dataset.theme, true);
  }

  /* ---------- state ------------------------------------------------------ */

  function themeById(id) {
    for (var i = 0; i < THEMES.length; i++) {
      if (THEMES[i].id === id) return THEMES[i];
    }
    return THEMES[0];
  }

  function paintPopup(themeId) {
    var theme = themeById(themeId);
    var root = document.documentElement.style;

    root.setProperty('--popup-primary', theme.from);
    root.setProperty('--popup-accent', theme.to);
    root.setProperty('--popup-primary-rgb', theme.rgb);
  }

  function selectTheme(themeId, persist) {
    activeTheme = themeId;

    swatches.forEach(function (swatch) {
      var isActive = swatch.dataset.theme === themeId;
      swatch.setAttribute('aria-checked', isActive ? 'true' : 'false');
      swatch.tabIndex = isActive ? 0 : -1;
    });

    paintPopup(themeId);

    if (persist) {
      chrome.storage.sync.set({ lmsTheme: themeId });
      sendToTab({ type: 'setTheme', theme: themeId });
    }
  }

  function setDark(enabled, persist) {
    darkToggle.checked = enabled;
    body.classList.toggle('dark', enabled);

    if (persist) {
      chrome.storage.sync.set({ darkMode: enabled });
      sendToTab({ type: 'toggleDark', enabled: enabled });
    }
  }

  /* ---------- messaging -------------------------------------------------- */

  /* The popup opens on any tab, including ones with no content script. Reading
     lastError inside the callback is what stops Chrome logging an unchecked
     runtime error every time someone opens this on a random page. */
  function sendToTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs && tabs[0];
      if (!tab || tab.id === undefined) return;

      chrome.tabs.sendMessage(tab.id, message, function () {
        if (chrome.runtime.lastError) {
          showStatus('Saved. Open the LMS or CMS to see it applied.');
        } else {
          hideStatus();
        }
      });
    });
  }

  var statusTimer = null;

  function showStatus(text) {
    status.textContent = text;
    status.hidden = false;

    clearTimeout(statusTimer);
    statusTimer = setTimeout(hideStatus, 4000);
  }

  function hideStatus() {
    clearTimeout(statusTimer);
    status.hidden = true;
  }

  /* ---------- boot ------------------------------------------------------- */

  renderSwatches();

  chrome.storage.sync.get(['darkMode', 'lmsTheme'], function (result) {
    setDark(!!(result && result.darkMode), false);
    selectTheme((result && result.lmsTheme) || DEFAULT_THEME, false);

    // Drop the transition freeze once the saved state is on screen.
    requestAnimationFrame(function () {
      body.classList.remove('is-loading');
    });
  });

  darkToggle.addEventListener('change', function () {
    setDark(darkToggle.checked, true);
  });

  // Keeps two open popups (or a second window) in step with each other.
  chrome.storage.onChanged.addListener(function (changes, area) {
    if (area !== 'sync') return;
    if (changes.darkMode) setDark(!!changes.darkMode.newValue, false);
    if (changes.lmsTheme) selectTheme(changes.lmsTheme.newValue || DEFAULT_THEME, false);
  });
})();
