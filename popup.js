document.addEventListener('DOMContentLoaded', () => {
  const darkToggle = document.getElementById('darkToggle');

  // Load saved state
  chrome.storage.sync.get(['darkMode'], (result) => {
    darkToggle.checked = !!result.darkMode;
  });

  // Save state and notify active tab
  darkToggle.addEventListener('change', () => {
    const enabled = darkToggle.checked;
    chrome.storage.sync.set({ darkMode: enabled });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'toggleDark', enabled });
      }
    });
  });
});
