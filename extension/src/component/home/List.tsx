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
  description: string;
};

interface ListProps {
  setUserToken: (token: string) => void;
}

const List = ({ setUserToken }: ListProps) => {
  const [data, setData] = useState<scriptsList[]>([]);
  const [extVariable, setExtVariable] = useState<{ [key: string]: string }>({});

  const handleChangle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExtVariable((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(extVariable);
  };

  useEffect(() => {
    getSub();
  }, []);

  async function getSub() {
    const key = localStorage.getItem('extensionKey');
    console.log(key);
    const userRef = collection(db, 'users');
    const q = query(userRef, where('extensionKey', '==', key));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      alert('please reconnect');
      setUserToken('');
      return;
    }
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
      if (nextNode.length === 1) {
        executionOrder.push(nextNode[0]);
        traverse(nextNode[0], nodes, edges);
      } else {
        nextNode.map((_item, index) => {
          executionOrder.push(nextNode[index]);
        });
        // traverse(nextNode[0], nodes, edges);
      }
    }

    const triggerNode = nodes.find((item) => item.type === 'trigger');

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

      //TODO
      if (executionOrder[i].data.value === 'extensionVariable') {
        console.log('zz', executionOrder[i].id + executionOrder[i].type + i);
        executionOrder[i].data.value =
          extVariable[executionOrder[i].id + executionOrder[i].type + executionOrder[i].position.x];
      }

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

  const getExecutionList = (data: Flow) => {
    const { nodes, edges } = data;
    const executionOrder: Node[] = [];
    function traverse(node: Node, nodes: Node[], edges: Edge[]) {
      const nextNode = getOutgoers(node, nodes, edges);
      if (nextNode.length === 1) {
        executionOrder.push(nextNode[0]);
        traverse(nextNode[0], nodes, edges);
      } else {
        nextNode.map((_item, index) => {
          executionOrder.push(nextNode[index]);
        });
        // traverse(nextNode[0], nodes, edges);
      }
    }

    const triggerNode = nodes.find((item) => item.type === 'trigger');

    if (triggerNode) {
      const nextNode = getOutgoers(triggerNode, nodes, edges);
      if (nextNode.length) {
        traverse(triggerNode, nodes, edges);
        return executionOrder;
      }
    }
  };

  return (
    <>
      {data
        ? data.map((item: scriptsList) => {
            const saveTime = new Date(item.saveTime?.seconds * 1000).toLocaleString('zh-TW', {
              hour12: false,
            });

            const executionList = getExecutionList(item.flow);
            console.log('getExetensinVariable', executionList);

            const extensionVariableLsit = executionList?.filter(
              (item) => item.data.value === 'extensionVariable'
            );

            return (
              <div
                className='flex relative flex-col w-full items-center pr-7 mb-3  pl-7'
                key={item.id}
              >
                <div className=' flex w-full justify-between shadow-sm shadow-mainBlue-300 items-center rounded-lg border border-gray-300 hover:border-mainBlue-300 bg-white p-3'>
                  <div className=' flex flex-col'>
                    <span className='text-base text-mainBlue-400'>{item.name}</span>
                    <span className='text-xs text-gray-400 font-normal'>{item.description}</span>
                    {extensionVariableLsit?.map((item, index) => (
                      <div className=' flex item-center  mt-1'>
                        <span className=' text-teal-600'>
                          {index + 1}. {item.type}：
                        </span>
                        <input
                          name={item.id + (item.type as string) + item.position.x}
                          type='text'
                          value={extVariable[item.id + item.type + item.position.x] || ''}
                          onChange={handleChangle}
                          className='border-b border-b-teal-600 outline-none w-28 text-gray-800'
                        />
                      </div>
                    ))}
                    <span className=' text-xs text-gray-400 font-normal mt-3'>
                      Edited:{saveTime}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      createCommandObject(item.flow);
                    }}
                    className=' rounded-md text-gray-400 hover:text-mainBlue-400 '
                  >
                    <TiFlashOutline size='28px' />
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
