import { db } from '../../lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Node, getOutgoers } from 'reactflow';

interface Idata {
  nodes: Inodes[];
  edges: object[];
}

interface data {
  CSS: string;
}

interface Inodes {
  type: string;
  data: data;
}

interface IitemObj {
  type: string;
  CSS: string;
}

type IexecutionOrder = Node[];

const List = () => {
  const workflowRef = collection(db, 'workflowtest');
  const q = query(workflowRef, orderBy('saveTime', 'desc'));
  const [workflowSnapShots, loading, error] = useCollection(q);

  const getExecutionOrder = (data: Idata) => {
    const { nodes, edges } = data;
    const executionOrder: IexecutionOrder = [];
    function traverse(node: Node, nodes: [], edges: []) {
      const nextNode = getOutgoers(node, nodes, edges);
      if (nextNode.length > 0) {
        executionOrder.push(nextNode[0]);
        traverse(nextNode[0], nodes, edges);
      }
    }
    const triggerNode = nodes.find((item) => item.type === 'trigger');
    if (triggerNode) {
      // @ts-expect-error 123
      traverse(triggerNode, nodes, edges);
    }
    return executionOrder;
  };

  const createCommandObject = (data: Idata) => {
    const executionOrder = getExecutionOrder(data);
    console.log(executionOrder);

    const commandsArr: object[] = [];
    for (let i = 0; i < executionOrder.length; i++) {
      const itemObj: IitemObj = {
        type: '',
        CSS: '',
      };

      // @ts-expect-error 123
      itemObj.type = executionOrder[i].type;
      itemObj.CSS = executionOrder[i].data.CSS;
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
