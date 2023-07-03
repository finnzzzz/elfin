// interface data {
//   type: string;
//   data: any;
// }

// type obj = Array<data>;

// interface Message {
//   command: string;
//   data: obj;
// }

console.log('content_script working');
chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg);
  if (msg.command == 'runCommands') {
    console.log('start commands');
    const scrapeObj = msg.data;
    getNextItem(scrapeObj, 0);
  }
});

function setNativeValue(el, value) {
  const previousValue = el.value;

  if (el.type === 'checkbox' || el.type === 'radio') {
    if ((!!value && !el.checked) || (!value && el.checked)) {
      el.click();
    }
  } else el.value = value;

  const tracker = el._valueTracker;
  if (tracker) {
    tracker.setValue(previousValue);
  }

  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function getNextItem(obj, index: number) {
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

    if (obj[index].type == 'inputCustom') {
      enterEvent(obj, index);
      console.log('inputCustom 執行順序:', index);
    }
    if (obj[index].type == 'newTab') {
      newTabEvent(obj, index);
      console.log('newTab 執行順序:', index);
    }
  } else {
    //send a return ...
    console.log('run complete');
    chrome.runtime.sendMessage({
      command: 'run-complete',
    });
  }
}

function delayEvent(obj, index: number) {
  const item = obj[index];
  const waitTime = parseInt(item.Data.DelayTime);
  window.setTimeout(function () {
    getNextItem(obj, index + 1);
  }, waitTime);
}

function clickEvent(obj, index) {
  const item = obj[index];
  // const element = document.querySelector(`.${item.Data.CSS}`);
  const xpathE = document.evaluate(
    `${item.Data.CSS}`,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  console.log(xpathE, index);
  if (xpathE) {
    xpathE.click();
    getNextItem(obj, index + 1);
    return;
  }
  alert(`no ${item.Data.CSS} element`);
}

// function saveEvent(obj, index) {
//   console.log('save');
//   var item = obj[index];
//   var value = document.querySelector(`.${item.one}`).innerText;
//   window.ScraperExt.push(value);
//   getNextItem(obj, index + 1);
// }
function enterEvent(obj, index) {
  const item = obj[index];
  console.log('item', item);
  const xpathE = document.evaluate(
    `${item.Data.CSS}`,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  console.log(xpathE, index);
  setNativeValue(xpathE, item.Data.Value);
  getNextItem(obj, index + 1);
}

function newTabEvent(obj, index) {
  const url = obj[index].Data.URL;
  window.open(url, '_blank');
  getNextItem(obj, index + 1);
}
