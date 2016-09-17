chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({'url': ('https://mcgingras.github.io/bigredhacks/'), 'selected': true});
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
