// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        code: 'var prompt = prompt("Search:"); if (prompt) { window.location.href = ("https://www.google.com/search?q=" + prompt); }'
    });
    chrome.runtime.reload();
});