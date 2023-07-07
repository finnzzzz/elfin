console.log('bakcfour');
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, {
    files: ['content.js'],
  });
});