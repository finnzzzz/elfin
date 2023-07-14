import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, orderBy, query, where, getDocs, onSnapshot } from 'firebase/firestore';

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

type scriptsList = {
  flow: Flow;
  id: string;
  name: string;
  saveTime: { seconds: number };
};

const List = () => {
  const [data, setData] = useState<scriptsList[]>([]);

  useEffect(() => {
    getSub();
  }, []);

  async function getSub() {
    const key = localStorage.getItem('extensionKey');
    console.log(key);
    const userRef = collection(db, 'users');
    const q = query(userRef, where('extensionKey', '==', key));
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0].id;

    const ref = collection(db, `users/${docId}/scripts`);
    const scripts = query(ref, orderBy('saveTime', 'desc'));
    const unsub = onSnapshot(scripts, (doc) => {
      const list: scriptsList[] = [];
      doc.forEach((doc) => {
        list.push(doc.data() as scriptsList);
      });
      setData(list);
    });

    return () => {
      unsub();
    };
  }

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

    if (!Array.isArray(executionOrder)) {
      // 處理 executionOrder 不是陣列的情況
      return;
    }

    const commandsArr: object[] = [];

    for (let i = 0; i < (executionOrder as Node[]).length; i++) {
      const itemObj: IitemObj = {
        type: '',
        data: {},
      };

      itemObj.type = executionOrder[i].type as string;
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
      {data
        ? data.map((item: scriptsList) => {
            const saveTime = new Date(item.saveTime?.seconds * 1000).toLocaleString('zh-TW', {
              hour12: false,
            });

            return (
              <div
                className='flex relative flex-col w-full items-center pr-7 mb-3  pl-7'
                key={item.id}
              >
                <div className=' flex w-full h-[85px] justify-between shadow-sm shadow-mainBlue-300 items-start rounded-lg border border-gray-300 hover:border-mainBlue-300 bg-white p-3'>
                  <div className=' flex flex-col gap-1'>
                    <span className='text-base text-mainBlue-400'>{item.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      createCommandObject(item.flow);
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
