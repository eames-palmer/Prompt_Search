/*
 * Saves the state of options.html.
 */
function saveOptions() {
    var searchEngine = document.getElementById('search_engine').value;
    chrome.storage.sync.set({
        defaultSearchEngine: searchEngine
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options Saved!';
        setTimeout(function() {
        status.textContent = '';
        }, 1000);
    });
}

/*
 * Restores the state of options.html.
 */
function restoreOptions() {
    chrome.storage.sync.get(['defaultSearchEngine'], function(items) {
        document.getElementById('search_engine').value =
            items.defaultSearchEngine;
    });
}

/*
 * Restores the state of options.html on load.
 */
document.addEventListener('DOMContentLoaded', restoreOptions);

/*
 * Saves the state of options.html when the save button is clicked.
 */
document.getElementById('save').addEventListener('click',
    saveOptions);