# Roblox Gamepass Creator Extension

A Chrome extension that automates gamepass creation and management for Roblox games through official Roblox APIs.

## 📋 Prerequisites

- Google Chrome (version 88 or higher)
- Active Roblox account
- At least one published Roblox game

## 🔧 Installation

### From Chrome Web Store

1. Visit the [Chrome Web Store listing](#) (coming soon)
2. Click "Add to Chrome"
3. Navigate to any Roblox.com page to use

### Manual Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gneza4/RobloxGamepassCreator.git
   cd "Gamepass Creator"
   ```

2. Load the extension in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked**
   - Select the cloned directory

3. Verify installation:
   - Extension icon should appear in Chrome toolbar
   - Visit `roblox.com` while logged in
   - Click extension icon to test

## 🏗️ Project Structure

```
Gamepass Creator/
├── manifest.json              # Extension manifest (v3)
├── popup/
│   ├── popup.html            # Extension UI
│   ├── popup.css             # Styles
│   └── popup.js              # Main logic & API calls
├── content/
│   └── content.js            # Content script for auth extraction
└── icons/
    ├── icon16.png            # 16x16 toolbar icon
    ├── icon48.png            # 48x48 extension management
    └── icon128.png           # 128x128 Chrome Web Store
```

## 🔑 Permissions

Required permissions in `manifest.json`:

```json
{
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://roblox.com/*",
    "https://*.roblox.com/*"
  ]
}
```

### Permission Usage:
- **activeTab**: Access current tab to verify Roblox login state
- **scripting**: Inject content script to extract CSRF token
- **host_permissions**: Make API requests to official Roblox endpoints

## 🔌 API Integration

### Endpoints Used

```javascript
// Fetch user's games
GET https://games.roblox.com/v2/users/{userId}/games?sortOrder=Asc&limit=50

// Get universe ID from place ID
GET https://apis.roblox.com/universes/v1/places/{placeId}/universe

// Create gamepass
POST https://apis.roblox.com/game-passes/v1/game-passes
Content-Type: multipart/form-data
Headers: x-csrf-token

// Update gamepass details (price, on-sale status)
POST https://apis.roblox.com/game-passes/v1/game-passes/{gamePassId}/details
Content-Type: multipart/form-data
Headers: x-csrf-token

// Fetch all gamepasses (paginated)
GET https://games.roblox.com/v1/games/{universeId}/game-passes?limit=100&sortOrder=Asc
```

### Authentication Flow

1. User must be logged into Roblox.com
2. Content script extracts:
   - User ID from `window.Roblox.CurrentUser.userId`
   - CSRF token from `<meta name="csrf-token">`
3. Popup receives credentials via message passing
4. All API calls use credentials + cookies

### Code Style

- ES6+ JavaScript (async/await)
- No external dependencies
- Vanilla DOM manipulation
- CSS custom properties for theming

## ⚙️ Configuration

### Preset Values

Edit `COMMON_VALUES` array in `popup/popup.js`:

```javascript
const COMMON_VALUES = [
  2, 5, 10, 15, 25, 50, 75, 100, 150, 200, 
  250, 350, 500, 750, 1000, 2500, 3500, 5000, 7500, 10000
];
```

### Rate Limiting

Adjust delays in API calls:

```javascript
// Gamepass creation delay
await sleep(500); // 500ms between creates

// Gamepass removal delay
await sleep(300); // 300ms between removals
```

## 🔒 Security Considerations

### What the Extension Does:
- ✅ Uses existing Roblox session
- ✅ Operates only on user action
- ✅ All processing happens client-side
- ✅ Communicates only with official Roblox APIs

### What the Extension Does NOT Do:
- ❌ Store credentials
- ❌ Send data to external servers
- ❌ Inject ads or tracking
- ❌ Access browsing history
- ❌ Modify pages outside Roblox.com

