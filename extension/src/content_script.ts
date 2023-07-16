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

console.log('content_script working');
type objj = {
  success: true;
};
chrome.runtime.onMessage.addListener(
  (msg: any, _sender: chrome.runtime.MessageSender, sendResponse: (obj: objj) => void) => {
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
  }
);

function setNativeValue(
  el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  value: string | boolean
): void {
  // const previousValue = el.value;

  if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
    if ((!!value && !el.checked) || (!value && el.checked)) {
      el.click();
    }
  } else {
    el.value = value as string;
    const inputEvent = new Event('input', { bubbles: true });
    el.dispatchEvent(inputEvent);
    const changeEvent = new Event('change', { bubbles: true });
    el.dispatchEvent(changeEvent);
  }

  // const tracker = el._valueTracker;
  // if (tracker) {
  //   tracker.setValue(previousValue);
  // }
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
      console.log('getContent 執行順序:', index);
    }
    if (obj[index].type == 'enterSubmit') {
      pressKey(obj, index);
      console.log('enterSubmit 執行順序:', index);
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

function pressKey(obj: obj, index: number) {
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
    // const keyValue = item.data.value;
    // const event = new KeyboardEvent('keydown', {
    //   key: 'a',
    //   keyCode: 65,
    //   bubbles: true,
    //   cancelable: true,
    // });

    // // 觸發事件
    // XPath.dispatchEvent(event);
    XPath.form.submit();
  } else {
    alert('no element');
  }

  getNextItem(obj, index + 1);
}
