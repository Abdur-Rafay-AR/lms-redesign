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
  });
})();

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'toggleDark') {
    document.documentElement.classList.toggle('lms-dark', msg.enabled);
  }
  if (msg.type === 'setTheme') {
    // Remove all existing theme classes (snapshot first to avoid live-list mutation)
    Array.from(document.documentElement.classList)
      .filter((cls) => cls.startsWith('lms-theme-'))
      .forEach((cls) => document.documentElement.classList.remove(cls));
    // Add the new theme class (skip for default blue)
    if (msg.theme && msg.theme !== 'blue') {
      document.documentElement.classList.add('lms-theme-' + msg.theme);
    }
  }
});
