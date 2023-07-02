// interface data {
//   type: string;
//   data: any;
// }

// type obj = Array<data>;

// interface Message {
//   command: string;
//   data: obj;
// }
chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg);
  if (msg.command == 'runCommands') {
    console.log('start commands');
    const scrapeObj = msg.data;
    getNextItem(scrapeObj, 0);
  }
});
function getNextItem(obj, index) {
  if (typeof obj[index] !== 'undefined') {
    if (obj[index].type == 'click') {
      clickEvent(obj, index);
      console.log('click 執行順序:', index);
    }

    // if (obj[index].type == 'wait') {
    //   waitEvent(obj, index);
    //   console.log('wait');
    // }

    // if (obj[index].type == 'save') {
    //   saveEvent(obj, index);
    // }

    if (obj[index].type == 'inputCustom') {
      enterEvent(obj, index);
      console.log('enter 執行順序:', index);
    }
  } else {
    //send a return ...
    console.log('run complete');
    chrome.runtime.sendMessage({
      command: 'run-complete',
    });
  }
}

// function waitEvent(obj: obj, index: number) {
//   const item = obj[index];
//   const waitTime = parseInt(item.one);
//   window.setTimeout(function () {
//     getNextItem(obj, index + 1);
//   }, waitTime);
// }

function clickEvent(obj, index) {
  const item = obj[index];
  const element = document.querySelector(`.${item.Data.CSS}`);
  console.log('element', element);
  if (element instanceof HTMLSelectElement) {
    console.log(element);
    element.click();
    getNextItem(obj, index + 1);
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
  const element = document.querySelector(`.${item.Data.CSS}`);
  const value = (document.querySelector(`.${item.Data.CSS}`).value = item.Data.Value);

  switch (item.Data.Type) {
    case 'text':
      if (element instanceof HTMLInputElement) {
        element.value = item.Data.Value;
      }
      break;
    case 'select':
      if (element instanceof HTMLSelectElement) {
        element.value = item.Data.Value;
      }
      break;

    case 'radio':
    case 'checkbox':
      if (element instanceof HTMLInputElement) {
        element.checked = true;
      }
      break;
  }
  getNextItem(obj, index + 1);
}

// /html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea
// //*[@id="APjFqb"]

// xpath
// const textareElement = document.evaluate(
//   '8',
//   document,
//   null,
//   XPathResult.FIRST_ORDERED_NODE_TYPE,
//   null
// ).singleNodeValue;
