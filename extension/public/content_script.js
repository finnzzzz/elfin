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
      console.log('click');
    }

    // if (obj[index].type == 'wait') {
    //   waitEvent(obj, index);
    //   console.log('wait');
    // }

    // if (obj[index].type == 'save') {
    //   saveEvent(obj, index);
    // }

    // if (obj[index].type == 'enter') {
    //   enterEvent(obj, index);
    //   console.log('enter');
    // }
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
  const element = document.querySelector(`.${item.CSS}`);
  console.log('element', element);
  if (element) {
    console.log(element);
    element.click();
  }
  getNextItem(obj, index + 1);
}

// function saveEvent(obj, index) {
//   console.log('save');
//   var item = obj[index];
//   var value = document.querySelector(`.${item.one}`).innerText;
//   window.ScraperExt.push(value);
//   getNextItem(obj, index + 1);
// }
// function enterEvent(obj, index) {
//   var item = obj[index];
//   var value = (document.querySelector(`.${item.one}`).value = item.two);
//   getNextItem(obj, index + 1);
// }
