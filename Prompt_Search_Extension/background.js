// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#32ABE2'});
    chrome.tabs.executeScript({
        code: 'var prompt = prompt("Search:"); if (prompt) { window.location.href = ("https://www.google.com/search?q=" + prompt); }'
    });
    chrome.runtime.reload();
});