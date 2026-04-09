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
    applyLmsInitialAvatar();
  });
})();

function getLmsDisplayName() {
  const selectors = [
    '.navbar-nav > .user-menu > a .hidden-xs',
    '.navbar-nav > .user-menu > a span',
    '.user-header > p'
  ];

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (!el) continue;
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) continue;

    // Remove likely roll-number prefixes when reading dropdown text.
    const cleaned = text.replace(/^\d[\d\-\s]+/, '').trim();
    if (cleaned) return cleaned;
  }

  return 'User';
}

function getInitialsFromName(name) {
  const words = (name || '')
    .replace(/[^A-Za-z\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return 'U';
}

function buildInitialAvatarDataUri(initials, backgroundColor, textColor) {
  const safeInitials = (initials || 'U').slice(0, 2).toUpperCase();
  const bg = backgroundColor || '#1e3a8a';
  const fg = textColor || '#ffffff';
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">',
    '<rect width="128" height="128" rx="64" ry="64" fill="' + bg + '"/>',
    '<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"',
    ' font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="700" fill="' + fg + '">',
    safeInitials,
    '</text>',
    '</svg>'
  ].join('');

  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function applyLmsInitialAvatar() {
  const rootStyles = getComputedStyle(document.documentElement);
  const backgroundColor = rootStyles.getPropertyValue('--lms-primary').trim() || '#1e3a8a';
  const textColor = rootStyles.getPropertyValue('--lms-on-primary').trim() || '#ffffff';
  const initials = getInitialsFromName(getLmsDisplayName());
  const avatarSrc = buildInitialAvatarDataUri(initials, backgroundColor, textColor);

  const avatarSelectors = [
    'img.user-image',
    'li.user-header img.img-circle',
    'img[src*="_viewfiles/images/person.png"]',
    'img[src*="/images/person.png"]'
  ];

  document.querySelectorAll(avatarSelectors.join(', ')).forEach((img) => {
    if (img.getAttribute('src') !== avatarSrc) {
      img.setAttribute('src', avatarSrc);
      img.setAttribute('alt', initials);
    }
  });
}

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'toggleDark') {
    document.documentElement.classList.toggle('lms-dark', msg.enabled);
    applyLmsInitialAvatar();
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
    applyLmsInitialAvatar();
  }
});

function initThemedLmsSelects() {
  const openState = new Map();

  function closeAll() {
    openState.forEach(({ wrapper, menu }) => {
      wrapper.classList.remove('open');
      if (menu.parentNode) menu.parentNode.removeChild(menu);
    });
    openState.clear();
  }

  ['semesterId', 'courseId'].forEach((id) => {
    const select = document.getElementById(id);
    if (!select || select.dataset.lmsCustomSelect === '1') return;

    select.dataset.lmsCustomSelect = '1';
    select.classList.add('lms-native-select-hidden');

    const wrapper = document.createElement('div');
    wrapper.className = 'lms-custom-select';
    wrapper.dataset.selectId = id;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lms-custom-select-trigger form-control';

    const menu = document.createElement('ul');
    menu.className = 'lms-custom-select-menu';
    menu.dataset.lmsMenu = id;

    function positionMenu() {
      const rect = trigger.getBoundingClientRect();
      menu.style.top = (rect.bottom + 4) + 'px';
      menu.style.left = rect.left + 'px';
      menu.style.minWidth = rect.width + 'px';
    }

    function syncTriggerLabel() {
      const selected = select.options[select.selectedIndex];
      trigger.textContent = selected ? selected.textContent.trim() : '';
    }

    function buildMenu() {
      menu.innerHTML = '';
      Array.from(select.options).forEach((opt, index) => {
        const item = document.createElement('li');
        item.className = 'lms-custom-select-option';
        if (index === select.selectedIndex) {
          item.classList.add('is-selected');
        }
        item.textContent = opt.textContent.trim();
        item.addEventListener('click', () => {
          select.selectedIndex = index;
          syncTriggerLabel();
          buildMenu();
          closeAll();
          select.dispatchEvent(new Event('change', { bubbles: true }));
        });
        menu.appendChild(item);
      });
    }

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = openState.has(id);
      closeAll();
      if (!isOpen) {
        wrapper.classList.add('open');
        positionMenu();
        document.body.appendChild(menu);
        openState.set(id, { wrapper, menu });
      }
    });

    select.addEventListener('change', () => {
      syncTriggerLabel();
      buildMenu();
    });

    wrapper.appendChild(trigger);
    select.insertAdjacentElement('afterend', wrapper);

    syncTriggerLabel();
    buildMenu();
  });

  if (!document.documentElement.dataset.lmsCustomSelectCloseBound) {
    document.documentElement.dataset.lmsCustomSelectCloseBound = '1';
    document.addEventListener('click', (event) => {
      if (
        !event.target.closest('.lms-custom-select') &&
        !event.target.closest('.lms-custom-select-menu')
      ) {
        closeAll();
      }
    });
    window.addEventListener('resize', closeAll);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initThemedLmsSelects();
    applyLmsInitialAvatar();
  });
} else {
  initThemedLmsSelects();
  applyLmsInitialAvatar();
}

if (!document.documentElement.dataset.lmsAvatarObserverBound) {
  document.documentElement.dataset.lmsAvatarObserverBound = '1';
  const avatarObserver = new MutationObserver(() => {
    applyLmsInitialAvatar();
  });

  avatarObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
