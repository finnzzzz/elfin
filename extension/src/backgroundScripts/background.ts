chrome.runtime.onMessage.addListener((msg) => {
  if (msg.command == 'newtab') {
    let times = 0;
    let messageSent = false;

    const sendCom = () => {
      if (!messageSent) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
          const activeTabId = tabs[0].id as number;
          console.log(activeTabId);
          const obj = msg.data;
          chrome.tabs.sendMessage(
            activeTabId,
            {
              command: 'runCommands',
              data: obj,
            },
            function (response) {
              if (response && response.success) {
                console.log('send success');
                messageSent = true;
              } else {
                console.log('send fail');
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
    console.log('bgget', msg.data.newExtensionKey);
    chrome.runtime.sendMessage({ command: 'setkey', data: msg.data.newExtensionKey });
  }
});
