chrome.runtime.onMessage.addListener((message) => {
  
  if(message.type === 'CHECK_STRINGS') {

    const {asin, strings} = message;

    const isPresent = [];

    for(const str of strings) {
      isPresent.push(checkIfPresent(asin, str));
    }

    return { isPresent };
  
  }

});

function checkIfPresent(asin, str) {
  // Logic to check if string is present on page  
}