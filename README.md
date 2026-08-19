# Bahria LMS Redesign — Chrome Extension

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?logo=googlechrome&logoColor=white)](manifest.json)
[![Version](https://img.shields.io/badge/version-2.1-success)](manifest.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A Chrome extension that gives Bahria University's LMS and CMS a modern UI overhaul — clean layout, dark mode, and 12 color themes.

**Supports:**
- `lms.bahria.edu.pk` — Student/faculty portal (AdminLTE 2 + Bootstrap 3)
- `cms.bahria.edu.pk` — Course management system (Aspire framework + Bootstrap 3)

---

## Installation

> This extension is unpacked (not on the Chrome Web Store), so you load it manually.

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select this repository folder (the one containing `manifest.json`).
6. The extension icon will appear in your toolbar.

---

## Usage

Click the extension icon in the toolbar to open the settings popup. The popup takes on
whichever theme is active, so it doubles as a preview.

### Dark Mode
Toggle the **Dark Mode** switch to flip between light and dark. The setting is remembered
across sessions and applies to both sites.

### Color Themes
Click any of the 12 swatches to apply a theme. The active one is ringed and shows a
checkmark. Arrow keys move through the grid. The selection persists across page loads and
browser restarts.

| Theme | Description |
|---|---|
| Blue | Default — deep navy |
| Crimson | Deep red/maroon |
| Forest | Earthy green |
| Baby Pink | Soft rose/pink |
| Mono | Pure black and white |
| Purple | Rich violet |
| Teal | Cool teal/cyan |
| Amber | Warm orange/amber |
| Ocean | Bright blue/cyan |
| Sage | Muted olive green |
| Rose | Deep magenta/rose |
| Dusk | Slate and indigo |

---

## File Structure

```
├── css/
│   ├── theme.css         # Shared: bundled font, design tokens, all 12 themes
│   ├── mystyle.css       # LMS-specific layout
│   ├── cms-style.css     # CMS-specific layout
│   └── popup.css         # Popup styles
├── fonts/
│   ├── inter-latin.woff2       # Bundled Inter (latin)
│   └── inter-latin-ext.woff2   # Bundled Inter (latin-ext)
├── icons/
│   └── logo.png          # Extension icon
├── js/
│   ├── theme-core.js     # Shared: state, messaging, flash prevention, helpers
│   ├── content.js        # LMS DOM tweaks (avatar, themed selects)
│   └── cms-content.js    # CMS DOM tweaks (dropdown contrast, submenus)
├── manifest.json
├── popup.html
└── popup.js              # Popup logic (storage read/write, messaging)
```

---

## How It Works

- **Manifest V3** with two `content_scripts` entries — one matched to LMS, one to CMS.
  Both load `theme.css` and `theme-core.js` first, then their site-specific files.
- All theming runs on CSS custom properties (`--lms-primary`, `--lms-bg`, …) defined once
  in `theme.css`. There is no per-color JavaScript.
- Theme and dark-mode state live in `chrome.storage.sync`, so they follow you across devices.
- The popup sends `chrome.tabs.sendMessage` to the active tab on every change; the content
  script toggles classes (`lms-dark`, `lms-theme-*`) on `<html>` instantly.

### No flash on load

`chrome.storage` is asynchronous, so at `document_start` the page would paint at least one
unstyled frame — a white flash on every load for dark-mode users. `theme-core.js` keeps a
mirror of the last known settings in the page's own `localStorage` and reads it
*synchronously* before the first paint. `chrome.storage` remains the source of truth and
corrects the mirror as soon as it resolves.

A `lms-preload` class suppresses every transition until the real settings land, so the
styles that settle during boot appear instantly instead of animating into place.

### Performance

Transitions are scoped to interactive elements rather than applied with `* { transition }`.
A universal rule makes the browser track an animation for every node on the page; on the
LMS course tables that alone made scrolling and theme switches feel sluggish. Measured on
the dashboard, a theme switch costs **~1.8× less** style and layout time than the universal
rule it replaced.

The `MutationObserver`s that keep the avatar and CMS dropdown patched are coalesced to one
run per animation frame and suspend themselves while writing, so they cannot retrigger
on their own changes.

### Fonts

Inter is bundled as two `woff2` subsets and declared with `@font-face` in `theme.css`.
The previous `@import` from Google Fonts was a render-blocking network request on every
page load and was subject to the site's content-security policy.

### Accessibility

- Every text/background pair is checked against WCAG AA (4.5:1) across all 24
  theme × mode combinations — buttons, labels, alerts, tables, tabs, pagination and links.
  `--lms-on-primary` follows the fill's lightness, and `--lms-link` is a separate token for
  the few themes whose primary is a fill color too dark or too pale to read as text.
- Keyboard support: the themed semester/course dropdowns respond to arrows, Home/End,
  Enter, Escape and Tab, and expose `role="listbox"` with `aria-expanded`/`aria-selected`.
- A visible focus ring is applied on `:focus-visible` only, so mouse users keep the
  original look.
- `prefers-reduced-motion: reduce` disables animations and smooth scrolling.

---

## Permissions

| Permission | Reason |
|---|---|
| `storage` | Save dark mode preference and selected theme |

No network access, no tab history, no cookies.

---

## Notes

- Content scripts run at `document_start` so styles apply before the page renders.
- LMS uses Font Awesome 4 (`FontAwesome`). CMS uses Font Awesome 5 (`Font Awesome 5 Free`,
  weight 900). The stylesheets handle each separately to preserve icons.
- If a theme or dark mode change doesn't apply, reload the page once after first install.

---

## License

[MIT](LICENSE) © Abdur-Rafay-AR

> Not affiliated with or endorsed by Bahria University. This extension only restyles pages
> you are already logged into; it sends no data anywhere.
