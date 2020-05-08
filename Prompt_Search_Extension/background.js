// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send prompt to the user for new webpage
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript({
        code: 'window.location.href = ("https://www.google.com/search?q=" + prompt("Search:"))'
    });
  });
});

chrome.commands.onCommand.addListener(function(command) {
    // Stores the value of the user input for use in the search query
    var prompt = prompt("Search:");
    if (prompt !== null) {
        chrome.tabs.executeScript({
            code: 'window.location.href = ("https://www.google.com/search?q=" + prompt)'
        });
    }
});
