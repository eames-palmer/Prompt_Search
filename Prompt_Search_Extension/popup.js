/**
 * Stores a reference to the search field element.
 */
let searchInput = document.getElementById('search-input');

/**
 * Moves user's cursor to search field.
 */
searchInput.focus();

/**
 * Stores past enteries (the history) of the search input field.
 */
let queries;

/**
 * Stores the user's current location within the history.
 */
let queriesLocation;

/**
 * Initializes queries from chrome's local storage.
 */
chrome.storage.sync.get(['queryHistory'], result => {
    queries = result.queryHistory;
    queriesLocation = queries.length;
});

/**
 * Sends a message to background.js with input value on search input submission.
 */
searchInput.addEventListener('keydown', () => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
    }
    /* Defines the max capacity of the stored queries */
    let maxQueries = 200;
    if (queries.length === maxQueries) {
        queries = queries.splice(0, 1);
        queriesLocation--;
    }
    switch (event.key) {
        case 'Enter':
            if (searchInput.value !== '') {
                queries[queriesLocation] = searchInput.value;
                queriesLocation++;
                chrome.storage.sync.set({
                    queryHistory: queries
                }, function() {
                    chrome.runtime.sendMessage({query: searchInput.value});
                });
            }
            break;
        case 'ArrowUp':
            if (queriesLocation > 0) {
                queriesLocation--;
                searchInput.value = queries[queriesLocation];
            }
            break;
        case 'ArrowDown':
            if (queries.length > queriesLocation) {
                if (queries.length - 1 === queriesLocation) {
                    queriesLocation++;
                    searchInput.value = '';
                } else {
                    queriesLocation++;
                    searchInput.value = queries[queriesLocation];
                }
            }
            break;
        default:
            break;
    }
});

/**
 * Update query history with each new keypress.
 */
searchInput.addEventListener('keyup', () => {
    if (queriesLocation >= 0 && queriesLocation < queries.length) {
        queries[queriesLocation] = searchInput.value;
    }
    chrome.storage.sync.set({
        queryHistory: queries
    }, null);
});