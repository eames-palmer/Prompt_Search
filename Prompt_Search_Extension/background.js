// Updates the current tab's URL with search engine query of user's search field input (defaults to Google)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.popupOpen) {
        if (message.popupOpen.startsWith("url:")) {
            chrome.tabs.update(null, {url: "" + message.popupOpen.substring(4)});
        } else if (message.popupOpen.startsWith("ddg:")) {
            chrome.tabs.update(null, {url: "https://duckduckgo.com/?q=" + message.popupOpen.substring(4)});
        } else if (message.popupOpen.startsWith("spg:")){
            chrome.tabs.update(null, {url: "https://www.startpage.com/do/dsearch?query=" + message.popupOpen.substring(4)});
        } else {
            chrome.tabs.update(null, {url: "https://www.google.com/search?q=" + message.popupOpen});
        }
    }
});