/* ============================================================
   CMS content script  (cms.bahria.edu.pk - Aspire / Bootstrap 3)
   Theme/dark-mode state is handled by js/theme-core.js, which the
   manifest loads first.
   ============================================================ */
(function () {
  'use strict';

  var Theme = window.LmsTheme;

  /* ============================================================
     Account dropdown contrast

     Aspire sets the link colours on these items with inline styles, which
     no stylesheet can beat. Rather than repainting them on every mutation
     (the old approach, and the reason theme switches stuttered here), we
     tag them once with a marker class and let CSS own the colours from
     there. The class survives dark-mode toggles, so a toggle costs nothing.
     ============================================================ */

  var DROPDOWN_SELECTORS = [
    '#ProfileInfo_hlProfile',
    '#ProfileInfo_hlLogoff',
    '#ProfileInfo_hlChangePassword',
    '#AccountsNavbar .dropdown-menu[role="menu"] > li > a'
  ].join(', ');

  function tagAccountDropdown() {
    document.querySelectorAll(DROPDOWN_SELECTORS).forEach(function (el) {
      if (el.dataset.lmsAccountLink === '1') return;

      el.dataset.lmsAccountLink = '1';
      el.classList.add('lms-account-link');

      // Strip Aspire's inline colour so the stylesheet can take over. Inline
      // styles outrank even !important rules, so this has to happen in JS.
      el.style.removeProperty('color');
      el.style.removeProperty('opacity');

      el.querySelectorAll('i, span').forEach(function (child) {
        child.style.removeProperty('color');
        child.style.removeProperty('opacity');
      });
    });
  }

  /* ============================================================
     Sidebar submenu height

     Bootstrap 3 collapses animate max-height from a value jQuery measures
     once. When our type scale changes the measured height, the submenu
     either clips or leaves a gap mid-animation. Clearing the inline height
     after the transition settles lets it size to content.
     ============================================================ */

  function relaxCollapsedSubmenus() {
    document.querySelectorAll('.list-group-subMenu.collapse.in').forEach(function (el) {
      if (el.style.height && el.style.height !== 'auto') {
        el.style.height = '';
      }
    });
  }

  /* ============================================================
     Wiring
     ============================================================ */

  function refresh() {
    tagAccountDropdown();
    relaxCollapsedSubmenus();
  }

  Theme.onChange(refresh);

  function boot() {
    refresh();

    // ASP.NET partial postbacks replace whole panels, so newly injected links
    // need tagging too. The observer suspends itself around our writes.
    Theme.selfHealingObserver(
      document.body,
      { childList: true, subtree: true },
      refresh
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('shown.bs.collapse', relaxCollapsedSubmenus, true);
  window.addEventListener('load', refresh);
})();
