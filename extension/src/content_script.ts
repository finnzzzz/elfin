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

type EventType =
  | 'click'
  | 'delay'
  | 'inputText'
  | 'inputSelect'
  | 'inputRadio'
  | 'inputCheckbox'
  | 'newTab'
  | 'getContent'
  | 'enterSubmit';

type EventHandlers = {
  [key in EventType]: (obj: Array<NodeData>, index: number) => void;
};

const eventHandlers: EventHandlers = {
  click: clickEvent,
  delay: delayEvent,
  inputText: enterEvent,
  inputSelect: enterEvent,
  inputRadio: enterEvent,
  inputCheckbox: enterEvent,
  newTab: newTabEvent,
  getContent: getContentEvent,
  enterSubmit: enterSubmitEvent,
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
  const item = obj[index];
  const eventType: EventType = item.type as EventType;
  const eventHandler = eventHandlers[eventType];

  if (eventHandler) {
    eventHandler(obj, index);
    console.log(`${eventType}, order of execution:`, index);
  } else {
    console.log('complete script');
    chrome.runtime.sendMessage({
      command: 'run-complete',
    });
  }
}

function getNodeByXPath(XPath: string, type: string) {
  try {
    return document.evaluate(XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
  } catch (error) {
    alert(`${type}'s XPath is wrong format`);
    return null;
  }
}

// -----------------------------------------event function

function delayEvent(obj: Array<NodeData>, index: number) {
  const item = obj[index];
  const waitTime = parseInt(item.data.delayTime);
  window.setTimeout(function () {
    getNextItem(obj, index + 1);
  }, waitTime);
}

function clickEvent(obj: Array<NodeData>, index: number) {
  const item = obj[index];
  const XPath = item.data.XPath;
  const type = item.type;
  const element = getNodeByXPath(XPath, type);

  if (element) {
    if (element instanceof HTMLAnchorElement) {
      // event.preventDefault();
      // const href = XPath.href;
      // XPath.click();
      //TODO A link logic
      window.open(element.href, '_blank');
      chrome.runtime.sendMessage({
        command: 'newtab',
        data: 'Alink',
      });
      // getNextItem(obj, index + 1);
      return;
    } else {
      element.click();
      getNextItem(obj, index + 1);
      return;
    }
  } else {
    alert('no element');
  }
}

function getContentEvent(obj: Array<NodeData>, index: number) {
  const item = obj[index];
  const XPath = item.data.XPath;
  const type = item.type;
  const element = getNodeByXPath(XPath, type);

  if (element) {
    const content = element.innerHTML;
    alert(content);
  } else {
    alert('no element');
  }
  getNextItem(obj, index + 1);
}

function enterEvent(obj: Array<NodeData>, index: number) {
  const item = obj[index];
  const XPath = item.data.XPath;
  const type = item.type;
  const element = getNodeByXPath(XPath, type);

  if (element) {
    setNativeValue(element, item.data.value);
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

function enterSubmitEvent(obj: Array<NodeData>, index: number) {
  const item = obj[index];
  const XPath = item.data.XPath;
  const type = item.type;
  const element = getNodeByXPath(XPath, type);

  if (element) {
    element.form?.submit();
  } else {
    alert('no element');
  }
  getNextItem(obj, index + 1);
}
