// Stores a reference to the search field
var search_input = document.getElementById('search_input');

// Sends a message to background.js with input value on search input submission
search_input.addEventListener('keypress', function() {
    if (event.key === "Enter") {
        chrome.runtime.sendMessage({popupOpen: search_input.value});
    }
});