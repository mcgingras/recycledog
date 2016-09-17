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

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    // LOG THE CONTENTS HERE
    console.log(request.content);
  });

chrome.tabs.getSelected(null, function(tab) {
  // Now inject a script onto the page
  chrome.tabs.executeScript(tab.id, {
       code: "chrome.extension.sendMessage({content: document.body.innerHTML}, function(response) { console.log('success'); });"
     }, function() { console.log('done'); });
});
