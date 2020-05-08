// Updates the current tab's URL with google query of user's search field input
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.popupOpen) {
        chrome.tabs.update(null, {url: "https://www.google.com/search?q=" + message.popupOpen});
    }
});