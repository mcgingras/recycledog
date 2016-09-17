chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var new_url = 'https://mcgingras.github.io/bigredhacks/' + '?url=' + url
    chrome.tabs.create({'url': new_url, 'selected': true});
  });
});

console.log('where are we');
