chrome.runtime.onMessage.addListener((msg) => {
  if (msg.command == 'newtab') {
    let times = 0;
    let messageSent = false;

    const sendCom = () => {
      if (!messageSent) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
          const activeTabId = tabs[0].id as number;
          const obj = msg.data;
          chrome.tabs.sendMessage(
            activeTabId,
            {
              command: 'runCommands',
              data: obj,
            },
            function (response) {
              if (response && response.success) {
                messageSent = true;
              }
            }
          );
        });
      }

      times++;

      if (times < 8 && !messageSent) {
        setTimeout(sendCom, 500);
      }
    };
    sendCom();
  } else if (msg.command == 'setExtensionKey') {
    chrome.runtime.sendMessage({ command: 'setkey', data: msg.data.newExtensionKey });
  }
});
