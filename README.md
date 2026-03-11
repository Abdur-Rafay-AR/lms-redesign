# Bahria LMS Redesign — Chrome Extension

A Chrome extension that gives Bahria University's LMS and CMS a modern UI overhaul — clean layout, dark mode, and 8 color themes.

**Supports:**
- `lms.bahria.edu.pk` — Student/faculty portal (AdminLTE + Bootstrap 3)
- `cms.bahria.edu.pk` — Course management system (Aspire framework)

---

## Installation

> This extension is unpacked (not on the Chrome Web Store), so you load it manually.

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select the `code/` folder (the one containing `manifest.json`).
6. The extension icon will appear in your toolbar.

---

## Usage

Click the extension icon in the toolbar to open the settings popup.

### Dark Mode
Toggle the **Dark Mode** switch to flip between light and dark on the current site. The setting is remembered across sessions.

### Color Themes
Click any of the 8 color swatches to apply a theme. The active theme is highlighted with a ring. The selection persists across page loads and browser restarts.

| Theme | Description |
|---|---|
| Blue | Default — clean navy blue |
| Crimson | Deep red/maroon |
| Forest | Earthy green |
| Pink | Soft rose/pink |
| Mono | Pure black and white |
| Purple | Rich violet |
| Teal | Cool teal/cyan |
| Amber | Warm orange/amber |

---

## File Structure

```
code/
├── css/
│   ├── mystyle.css       # LMS styles + all 8 theme definitions
│   └── cms-style.css     # CMS styles + all 8 theme definitions
├── icons/
│   └── logo.png          # Extension icon
├── js/
│   ├── content.js        # LMS content script (class application + message listener)
│   └── cms-content.js    # CMS content script (class application + message listener)
├── manifest.json
├── popup.html            # Extension popup UI
└── popup.js              # Popup logic (storage read/write, messaging)
```

---

## How It Works

- **Manifest V3** with two separate `content_scripts` entries — one matched to LMS, one to CMS. They are completely isolated from each other.
- Theme and dark mode state are stored in `chrome.storage.sync` so they sync across devices.
- The popup sends a `chrome.tabs.sendMessage` to the active tab whenever the user changes a setting; the content script on the page applies or removes CSS classes (`lms-dark`, `lms-theme-*`) on `<html>` instantly.
- All theming is done via CSS custom properties (`--lms-primary`, `--lms-bg`, etc.) — no JavaScript DOM manipulation for colors.

---

## Permissions

| Permission | Reason |
|---|---|
| `storage` | Save dark mode preference and selected theme |

No network access, no tab history, no cookies.

---

## Notes

- The extension runs at `document_start` so styles are applied before the page renders, preventing a flash of the original yellow theme.
- LMS uses Font Awesome 4 (`FontAwesome` family). CMS uses Font Awesome 5 (`Font Awesome 5 Free`, weight 900). The stylesheets handle each separately to preserve icons.
- If a theme or dark mode change doesn't apply, try reloading the page once after first install.
