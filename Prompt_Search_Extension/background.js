/*
 * Sets default search engine to google.
 */
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        defaultSearchEngine: 'google'
    }, null);
});

/*
 * Updates the current tab's URL with search engine query of user's search
 * field input.
 *
 * message: a message containing the search input value.
 */
function handleQuery(message) {
    chrome.storage.sync.get(['defaultSearchEngine'], function(result) {
        /* Stores the default search engine */
        var engine = result.defaultSearchEngine;
        if(message.popupOpen) {
            if (message.popupOpen.startsWith("url:")) {
                    chrome.tabs.update(null, {url: "https://"
                        + message.popupOpen.substring(4).trim()});
            } else {
                switch (engine) {
                    case 'google':
                        chrome.tabs.update(null, {
                            url: "https://www.google.com/search?q="
                                + message.popupOpen
                            }
                        );
                        break;
                    case 'duckduckgo':
                        chrome.tabs.update(null, {
                            url: "https://duckduckgo.com/?q="
                                + message.popupOpen
                            }
                        );
                        break;
                    case 'startpage' :
                        chrome.tabs.update(null, {
                            url: "https://www.startpage.com/do/dsearch?query="
                                + message.popupOpen
                            }
                        );
                        break;
                    default:
                        alert("Error with search engine preference");
                        break;
                }
            }
        }
    });
}

/* On message send the query to be handled */
chrome.runtime.onMessage.addListener(handleQuery);
