/*
 * Sets default search engine to google and initializes the query history.
 */
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        defaultSearchEngine: 'google',
        queryHistory: []
    }, null);
});

/*
 * Updates the current tab's URL with search engine query of user's search
 * field input.
 *
 * message: a message containing the search input value.
 */
function handleQuery(message) {
    chrome.storage.sync.get(['defaultSearchEngine'], result => {
        /*
         * Stores the default search engine.
         */
        var engine = result.defaultSearchEngine;
        if(!message.query) {
            throw 'No Input';
        }
        if (message.query.startsWith('url:')) {
                chrome.tabs.update(null, {url: 'https://'
                    + message.query.substring(4).trim()});
        } else {
            switch (engine) {
                case 'google':
                    chrome.tabs.update(null, {
                        url: 'https://www.google.com/search?q='
                            + message.query
                        }
                    );
                    break;
                case 'duckduckgo':
                    chrome.tabs.update(null, {
                        url: 'https://duckduckgo.com/?q='
                            + message.query
                        }
                    );
                    break;
                case 'startpage':
                    chrome.tabs.update(null, {
                        url: 'https://www.startpage.com/do/dsearch?query='
                            + message.query
                        }
                    );
                    break;
                default:
                    alert('Error with search engine preference');
                    break;
            }
        }
    });
}

/*
 * On message send the message containing a query to be handled.
 */
chrome.runtime.onMessage.addListener(handleQuery);
