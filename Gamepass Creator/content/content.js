// Content script runs on Roblox pages to extract user data and CSRF token

function getUserData() {
  const userDataMeta = document.querySelector('meta[name="user-data"]');
  
  if (!userDataMeta) {
    return null;
  }

  return {
    userId: userDataMeta.getAttribute('data-userid'),
    username: userDataMeta.getAttribute('data-name'),
    displayName: userDataMeta.getAttribute('data-displayname')
  };
}

function getCsrfToken() {
  const csrfMeta = document.querySelector('meta[name="csrf-token"]');
  return csrfMeta ? csrfMeta.getAttribute('data-token') : null;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getUserData') {
    const userData = getUserData();
    const csrfToken = getCsrfToken();
    
    sendResponse({
      userData,
      csrfToken,
      isRoblox: window.location.hostname.includes('roblox.com')
    });
  }
  
  return true; // Keep the message channel open for async response
});