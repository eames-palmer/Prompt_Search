/* Stores a reference to the search field */
var searchInput = document.getElementById('search_input');

/* Moves Cursor to Search Field */
searchInput.focus();

/*
 * Sends a message to background.js with input value on search input submission
 */
searchInput.addEventListener('keypress', function() {
    if (event.key === "Enter") {
        chrome.runtime.sendMessage({popupOpen: searchInput.value});
    }
});