// Apply dark mode class as early as possible to avoid flash
(function () {
  chrome.storage.sync.get(['darkMode'], (result) => {
    if (result.darkMode) {
      document.documentElement.classList.add('lms-dark');
    }
  });
})();

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'toggleDark') {
    document.documentElement.classList.toggle('lms-dark', msg.enabled);
  }
});
