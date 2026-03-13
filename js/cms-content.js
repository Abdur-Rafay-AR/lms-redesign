// Apply dark mode and theme classes as early as possible to avoid flash
(function () {
  chrome.storage.sync.get(['darkMode', 'lmsTheme'], (result) => {
    if (result.darkMode) {
      document.documentElement.classList.add('lms-dark');
    }
    const theme = result.lmsTheme || 'blue';
    if (theme !== 'blue') {
      document.documentElement.classList.add('lms-theme-' + theme);
    }
    applyCmsAvatarDropdownTextColor();
  });
})();

function applyCmsAvatarDropdownTextColor() {
  const isDark =
    document.documentElement.classList.contains('lms-dark') ||
    (document.body && document.body.classList.contains('lms-dark'));

  const selectors = [
    '#ProfileInfo_hlProfile',
    '#ProfileInfo_hlLogoff',
    '#ProfileInfo_hlChangePassword',
    '#AccountsNavbar .dropdown-menu[role="menu"] > li > a'
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (isDark) {
        el.style.setProperty('color', '#ffffff', 'important');
        el.style.setProperty('opacity', '1', 'important');
      } else {
        el.style.removeProperty('color');
        el.style.removeProperty('opacity');
      }
    });
  });

  document
    .querySelectorAll('#AccountsNavbar .dropdown-menu[role="menu"] > li > a i, #AccountsNavbar .dropdown-menu[role="menu"] > li > a span')
    .forEach((el) => {
      if (isDark) {
        el.style.setProperty('color', '#ffffff', 'important');
        el.style.setProperty('opacity', '1', 'important');
      } else {
        el.style.removeProperty('color');
        el.style.removeProperty('opacity');
      }
    });
}

const cmsDropdownObserver = new MutationObserver(() => {
  applyCmsAvatarDropdownTextColor();
});

if (document.documentElement) {
  cmsDropdownObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'toggleDark') {
    document.documentElement.classList.toggle('lms-dark', msg.enabled);
    applyCmsAvatarDropdownTextColor();
  }
  if (msg.type === 'setTheme') {
    Array.from(document.documentElement.classList)
      .filter((cls) => cls.startsWith('lms-theme-'))
      .forEach((cls) => document.documentElement.classList.remove(cls));
    if (msg.theme && msg.theme !== 'blue') {
      document.documentElement.classList.add('lms-theme-' + msg.theme);
    }
    applyCmsAvatarDropdownTextColor();
  }
});
