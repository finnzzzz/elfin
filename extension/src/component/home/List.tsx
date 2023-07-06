import { db } from '../../lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Node, Edge, XYPosition, getOutgoers } from 'reactflow';

interface IitemObj {
  type: string;
  Data: object;
}

type Flow = {
  nodes: Node[];
  edges: Edge[];
  viewport: XYPosition;
};

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'newtab') {
    // alert('123');

    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
        const activeTabId = tabs[0].id as number;
        console.log(activeTabId);
        const obj = msg.data;
        chrome.tabs.sendMessage(activeTabId, {
          command: 'runCommands',
          data: obj,
        });
      });
    }, 1500);
  }
});

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
        Data: {},
      };

      itemObj.type = executionOrder[i].type;
      itemObj.Data = executionOrder[i].data;
      commandsArr.push(itemObj);
    }

    console.log('commandsArr', commandsArr);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTabId = tabs[0].id as number;
      console.log(activeTabId);
      const obj = commandsArr;
      chrome.tabs.sendMessage(activeTabId, {
        command: 'runCommands',
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
            const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
            return (
              <div className='flex flex-col items-center' key={item.id}>
                <button>delete</button>
                <div className=' flex w-[300px] flex-col items-center rounded-lg border border-blue-500 bg-slate-200 p-3'>
                  <span className=' mb-2'>{item.data().name}</span>
                  <span className=' mb-2 text-sm'>{item.data().id}</span>
                  <span className=' text-sm'>save time：</span>
                  <span className=' text-sm'>{saveTime}</span>
                  <button
                    onClick={() => {
                      createCommandObject(item.data().flow);
                    }}
                    className=' border border-blue-500 p-1 rounded-md'
                  >
                    start
                  </button>
                </div>
              </div>
            );
          })
        : 'nodata'}
    </>
  );
};

export default List;
