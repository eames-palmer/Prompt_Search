/**
 * Saves the state of options that are present within the HTML page.
 */
function saveOptions() {
    let searchEngine = document.getElementById('search-engine').value;
    chrome.storage.sync.set({
        defaultSearchEngine: searchEngine
    }, function() {
        let status = document.getElementById('status');
        status.textContent = 'Options Saved!';
        setTimeout(function() {
        status.textContent = '';
        }, 1000);
    });
}

/**
 * Restores the state of the options present on the HTML page.
 */
function restoreOptions() {
    chrome.storage.sync.get(['defaultSearchEngine'], function(items) {
        document.getElementById('search-engine').value =
            items.defaultSearchEngine;
    });
}

/**
 * Restores the state of the options as soon as the page loads.
 */
document.addEventListener('DOMContentLoaded', restoreOptions);

/**
 * Saves the state of the options when the save button is clicked.
 */
document.getElementById('save').addEventListener('click',
    saveOptions);