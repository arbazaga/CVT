// Listen for messages from popup
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // Check for CHECK_STRINGS message
  if (message.type === 'CHECK_STRINGS') {
    const { asin, strings } = message;

    // Check strings on Amazon product page
    const isPresent = await checkStrings(asin, strings);

    // Return result to popup
    sendResponse({ isPresent });
  }
});

// Helper functions

async function checkStrings(asin, strings) {
  const url = `https://www.amazon.co.uk/dp/${asin}`;
  const response = await fetch(url);
  const text = await response.text();
  return strings.map((string) => text.includes(string));
}
