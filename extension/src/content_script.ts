console.log('elfin extension working');

type NodeContentData = {
  XPath: string;
  delayTime: string;
  url: string;
  value: string;
  disable: boolean;
  description: string;
};

interface NodeData {
  type: string;
  data: NodeContentData;
}

type SuccessRes = {
  success: true;
};

type NodeObj = {
  obj: Array<NodeData>;
  index: number;
};

type message = {
  command: string;
  data: NodeObj | Array<NodeData>;
};

chrome.runtime.onMessage.addListener(
  (
    msg: message,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (res: SuccessRes) => void
  ) => {
    if (msg.command == 'firstRunCommands') {
      sendResponse({ success: true });
      const scrapeObj = msg.data as Array<NodeData>;
      getNextItem(scrapeObj, 0);
    } else if (msg.command == 'runCommands') {
      sendResponse({ success: true });
      const msgData = msg.data as NodeObj;
      const scrapeObj = msgData.obj;
      const index = msgData.index + 1;
      getNextItem(scrapeObj, index);
    }
  }
);

function setNativeValue(
  el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  value: string | boolean
): void {
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
}

function getNextItem(obj: Array<NodeData>, index: number) {
  if (typeof obj[index] !== 'undefined') {
    if (obj[index].type == 'click') {
      clickEvent(obj, index);
      console.log('click, order of execution:', index);
    }

    if (obj[index].type == 'delay') {
      delayEvent(obj, index);
      console.log('delay, order of execution:', index);
    }
    if (
      obj[index].type == 'inputText' ||
      obj[index].type == 'inputSelect' ||
      obj[index].type == 'inputRadio' ||
      obj[index].type == 'inputCheckbox'
    ) {
      enterEvent(obj, index);
      console.log('inputCustom, order of execution:', index);
    }
    if (obj[index].type == 'newTab') {
      newTabEvent(obj, index);
      console.log('newTab, order of execution:', index);
    }
    if (obj[index].type == 'getContent') {
      getContentEvent(obj, index);
      console.log('getContent, order of execution:', index);
    }
    if (obj[index].type == 'enterSubmit') {
      enterSubmit(obj, index);
      console.log('enterSubmit, order of execution:', index);
    }
  } else {
    console.log('run complete');
    chrome.runtime.sendMessage({
      command: 'run-complete',
    });
  }
}

function delayEvent(obj: Array<NodeData>, index: number) {
  const item = obj[index];
  const waitTime = parseInt(item.data.delayTime);
  window.setTimeout(function () {
    getNextItem(obj, index + 1);
  }, waitTime);
}

function clickEvent(obj: Array<NodeData>, index: number) {
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
    //TODO A link logic
    if (XPath instanceof HTMLAnchorElement) {
      // event.preventDefault();
      // const href = XPath.href;
      // XPath.click();
      window.open(XPath.href, '_blank');
      chrome.runtime.sendMessage({
        command: 'newtab',
        data: 'Alink',
      });
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

function getContentEvent(obj: Array<NodeData>, index: number) {
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

function enterEvent(obj: Array<NodeData>, index: number) {
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

function newTabEvent(obj: Array<NodeData>, index: number) {
  const url = obj[index].data.url;
  window.open(url, '_blank');
  chrome.runtime.sendMessage({
    command: 'newtab',
    data: { obj, index },
  });
}

function enterSubmit(obj: Array<NodeData>, index: number) {
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
    XPath.form?.submit();
  } else {
    alert('no element');
  }
  getNextItem(obj, index + 1);
}
