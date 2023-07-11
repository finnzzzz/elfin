import { db } from '../../lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { TiFlashOutline } from 'react-icons/ti';

import { Node, Edge, XYPosition, getOutgoers } from 'reactflow';

interface IitemObj {
  type: string;
  data: object;
}

type Flow = {
  nodes: Node[];
  edges: Edge[];
  viewport: XYPosition;
};

// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//   if (msg.command == 'newtab') {
//     setInterval(() => {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
//         const activeTabId = tabs[0].id as number;
//         console.log(activeTabId);
//         const obj = msg.data;
//         chrome.tabs.sendMessage(activeTabId, {
//           command: 'runCommands',
//           data: obj,
//         });
//       });
//     }, 500);
//   }
// });

const List = () => {
  const userRef = collection(db, 'users', '1DK9kKHiK3ZePLTo0x2Kyfx6Qut1', 'scripts');
  const q = query(userRef, orderBy('saveTime', 'desc'));
  const [workflowSnapShots, loading, error] = useCollection(q);

  const getExecutionOrder = (data: Flow) => {
    const { nodes, edges } = data;
    const executionOrder: Node[] = [];
    function traverse(node: Node, nodes: Node[], edges: Edge[]) {
      const nextNode = getOutgoers(node, nodes, edges);
      if (nextNode.length) {
        executionOrder.push(nextNode[0]);
        traverse(nextNode[0], nodes, edges);
      }
    }

    const triggerNode = nodes.find((item) => item.type === 'trigger');
    console.log(triggerNode);

    if (triggerNode) {
      const nextNode = getOutgoers(triggerNode, nodes, edges);
      if (nextNode.length) {
        traverse(triggerNode, nodes, edges);
        return executionOrder;
      }
      return alert('no event after trigger');
    }
    return alert('no trigger node');
  };

  const createCommandObject = (data: Flow) => {
    const executionOrder = getExecutionOrder(data);
    console.log('executionOrder', executionOrder);

    const commandsArr: object[] = [];

    for (let i = 0; i < (executionOrder as Node[]).length; i++) {
      const itemObj: IitemObj = {
        type: '',
        data: {},
      };

      itemObj.type = executionOrder[i].type;
      itemObj.data = executionOrder[i].data;
      commandsArr.push(itemObj);
    }

    console.log('commandsArr', commandsArr);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTabId = tabs[0].id as number;
      console.log(activeTabId);
      const obj = commandsArr;
      chrome.tabs.sendMessage(activeTabId, {
        command: 'firstRunCommands',
        data: obj,
      });
    });
  };

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
      {workflowSnapShots?.docs
        ? workflowSnapShots.docs.map((item) => {
            const saveTimeSeconds = item.data().saveTime?.seconds;
            const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString('zh-TW', {
              hour12: false,
            });
            return (
              <div
                className='flex relative flex-col w-full items-center pr-7 mb-4  pl-7'
                key={item.id}
              >
                {/* <button>delete</button> */}
                <div className=' flex w-full h-[85px] justify-between shadow-sm shadow-mainBlue-300 items-start rounded-lg border border-blue-400 bg-white p-3'>
                  <div className=' flex flex-col gap-1'>
                    <span className='text-base text-mainBlue-400'>{item.data().name}</span>
                    <span className=' text-gray-400'>description</span>
                  </div>
                  <button
                    onClick={() => {
                      createCommandObject(item.data().flow);
                    }}
                    className=' rounded-md text-gray-400 hover:text-mainBlue-400 mt-2 mr-2'
                  >
                    <TiFlashOutline size='28px' />
                  </button>
                </div>
                <span className=' text-xs absolute right-10 text-gray-400 bottom-1'>
                  Edited:{saveTime}
                </span>
              </div>
            );
          })
        : 'nodata'}
    </>
  );
};

export default List;
