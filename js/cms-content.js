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

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'toggleDark') {
    document.documentElement.classList.toggle('lms-dark', msg.enabled);
  }
  if (msg.type === 'setTheme') {
    Array.from(document.documentElement.classList)
      .filter((cls) => cls.startsWith('lms-theme-'))
      .forEach((cls) => document.documentElement.classList.remove(cls));
    if (msg.theme && msg.theme !== 'blue') {
      document.documentElement.classList.add('lms-theme-' + msg.theme);
    }
  }
});
