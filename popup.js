document.addEventListener('DOMContentLoaded', () => {
  const darkToggle = document.getElementById('darkToggle');
  const themeGrid = document.getElementById('themeGrid');
  const swatches = themeGrid.querySelectorAll('.theme-swatch');

  // Load saved state
  chrome.storage.sync.get(['darkMode', 'lmsTheme'], (result) => {
    darkToggle.checked = !!result.darkMode;
    const saved = result.lmsTheme || 'blue';
    setActiveSwatch(saved);
  });

  // Dark mode toggle
  darkToggle.addEventListener('change', () => {
    const enabled = darkToggle.checked;
    chrome.storage.sync.set({ darkMode: enabled });
    sendToTab({ type: 'toggleDark', enabled });
  });

  // Theme swatch clicks
  swatches.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      setActiveSwatch(theme);
      chrome.storage.sync.set({ lmsTheme: theme });
      sendToTab({ type: 'setTheme', theme });
    });
  });

  function setActiveSwatch(theme) {
    swatches.forEach((s) => s.classList.toggle('active', s.dataset.theme === theme));
  }

  function sendToTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
});
