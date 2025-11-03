// Background service worker for the extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Roblox Gamepass Creator installed');
});

// Handle any background tasks if needed
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Add any background processing here if needed
  return true;
});