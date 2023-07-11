interface data {
  type: string;
  data: {
    XPath: string;
    delayTime: string;
    url: string;
    value: string;
    disable: boolean;
  };
}

type obj = Array<data>;

// interface Message {
//   command: string;
//   data: obj;
// }

console.log('content_script working');
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  if (msg.command == 'firstRunCommands') {
    sendResponse({ success: true });
    console.log('firstRunCommands');
    const scrapeObj = msg.data;
    getNextItem(scrapeObj, 0);
    console.log(msg.data);
  } else if (msg.command == 'runCommands') {
    sendResponse({ success: true });
    console.log('start commands');
    const scrapeObj = msg.data.obj;
    const index = msg.data.index + 1;
    console.log(scrapeObj, index, typeof index);

    getNextItem(scrapeObj, index);
  }
});

function setNativeValue(el: HTMLInputElement | HTMLSelectElement, value: string) {
  const previousValue = el.value;

  if (el.type === 'checkbox' || el.type === 'radio') {
    if ((!!value && !el.checked) || (!value && el.checked)) {
      el.click();
    }
  } else el.value = value;

  const tracker = (el as any)._valueTracker;
  if (tracker) {
    tracker.setValue(previousValue);
  }

  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function getNextItem(obj: obj, index: number) {
  if (typeof obj[index] !== 'undefined') {
    if (obj[index].type == 'click') {
      clickEvent(obj, index);
      console.log('click 執行順序:', index);
    }

    if (obj[index].type == 'delay') {
      delayEvent(obj, index);
      console.log('wait');
    }

    // if (obj[index].type == 'save') {
    //   saveEvent(obj, index);
    // }

    if (
      obj[index].type == 'inputText' ||
      obj[index].type == 'inputSelect' ||
      obj[index].type == 'inputRadio' ||
      obj[index].type == 'inputCheckbox'
    ) {
      enterEvent(obj, index);
      console.log('inputCustom 執行順序:', index);
    }
    if (obj[index].type == 'newTab') {
      newTabEvent(obj, index);
      console.log('newTab 執行順序:', index);
    }
    if (obj[index].type == 'getContent') {
      getContentEvent(obj, index);
    }
  } else {
    //send a return ...
    console.log('run complete');
    chrome.runtime.sendMessage({
      command: 'run-complete',
    });
  }
}

function delayEvent(obj: obj, index: number) {
  const item = obj[index];
  const waitTime = parseInt(item.data.delayTime);
  window.setTimeout(function () {
    getNextItem(obj, index + 1);
  }, waitTime);
}

function clickEvent(obj: obj, index: number) {
  const item = obj[index];
  const XPath = document.evaluate(
    `${item.data.XPath}`,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLElement | null;
  console.log(XPath, index);
  if (XPath) {
    if (XPath instanceof HTMLAnchorElement) {
      // event.preventDefault();
      console.log('alink');
      console.log(XPath.href);
      // const href = XPath.href;
      // XPath.click();
      window.open(XPath.href, '_blank');
      chrome.runtime.sendMessage({
        command: 'newtab',
        data: '123',
      });

      // 繼續執行 JavaScript 的程式碼
      // getNextItem(obj, index + 1);
      return;
    } else {
      XPath.click();
      getNextItem(obj, index + 1);
      return;
    }
  }
  alert(`no ${item.data.XPath} element`);
}

// function saveEvent(obj, index) {
//   console.log('save');
//   var item = obj[index];
//   var value = document.querySelector(`.${item.one}`).innerText;
//   window.ScraperExt.push(value);
//   getNextItem(obj, index + 1);
// }

function getContentEvent(obj: obj, index: number) {
  const item = obj[index];
  const XPath = document.evaluate(
    `${item.data.XPath}`,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLElement | null;
  console.log(XPath, index);
  if (XPath) {
    const content = XPath.innerHTML;
    alert(content);
  } else {
    alert('no element');
  }
  getNextItem(obj, index + 1);
}

function enterEvent(obj: obj, index: number) {
  const item = obj[index];
  console.log('item', item);
  const XPath = document.evaluate(
    `${item.data.XPath}`,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLInputElement | HTMLSelectElement | null;
  console.log(XPath, index);
  if (XPath) {
    setNativeValue(XPath, item.data.value);
  } else {
    alert('no element');
  }

  getNextItem(obj, index + 1);
}

function newTabEvent(obj: obj, index: number) {
  const url = obj[index].data.url;
  window.open(url, '_blank');
  chrome.runtime.sendMessage({
    command: 'newtab',
    data: { obj, index },
  });
}
