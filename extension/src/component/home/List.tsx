import { useState, useEffect } from 'react';
// -----------------------------------------------
import { db } from '../../lib/firebase';
import { collection, orderBy, query, where, getDocs, onSnapshot } from 'firebase/firestore';
// -----------------------------------------------
import { TiFlashOutline } from 'react-icons/ti';
// -----------------------------------------------
import { Node, Edge, XYPosition, getOutgoers } from 'reactflow';
// -----------------------------------------------
type Flow = {
  nodes: Node[];
  edges: Edge[];
  viewport: XYPosition;
};

type ScriptsList = {
  flow: Flow;
  id: string;
  name: string;
  saveTime: { seconds: number };
  description: string;
};

interface ListProps {
  setUserToken: (token: string) => void;
}
// -----------------------------------------------

const List = ({ setUserToken }: ListProps) => {
  const [data, setData] = useState<ScriptsList[]>([]);
  const [extVariable, setExtVariable] = useState<{ [key: string]: string }>({});

  const handleChangle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExtVariable((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function getSub() {
    const key = localStorage.getItem('extensionKey');
    const userRef = collection(db, 'users');
    const q = query(userRef, where('extensionKey', '==', key));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      setUserToken('');
      localStorage.removeItem('extensionKey');
      alert('please reconnect');
      return;
    }
    const docId = querySnapshot.docs[0].id;

    const ref = collection(db, `users/${docId}/scripts`);
    const scripts = query(ref, orderBy('saveTime', 'desc'));
    const unsub = onSnapshot(scripts, (doc) => {
      const list: ScriptsList[] = [];
      doc.forEach((doc) => {
        list.push(doc.data() as ScriptsList);
      });
      setData(list);
    });

    return () => {
      unsub();
    };
  }

  const traverseNodes = (node: Node, nodes: Node[], edges: Edge[], executionOrder: Node[]) => {
    const nextNode = getOutgoers(node, nodes, edges);
    if (nextNode.length === 1 && !nextNode[0].data.disable) {
      executionOrder.push(nextNode[0]);

      traverseNodes(nextNode[0], nodes, edges, executionOrder);
    } else {
      nextNode.map((_item, index) => {
        executionOrder.push(nextNode[index]);
      });
      //TODO parallel logic
      // traverse(nextNode[0], nodes, edges);
    }
  };

  const getExecutionOrder = (data: Flow) => {
    const { nodes, edges } = data;
    const executionOrder: Node[] = [];

    const triggerNode = nodes.find((item) => item.type === 'trigger');

    if (triggerNode) {
      const nextNode = getOutgoers(triggerNode, nodes, edges);
      if (nextNode.length) {
        traverseNodes(triggerNode, nodes, edges, executionOrder);
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
      return;
    }

    const commandsArr: object[] = executionOrder.map((node) => {
      if (node.data.value === 'extensionVariable') {
        node.data.value = extVariable[node.id + node.type + node.position.x];
      }
      return {
        type: node.type as string,
        data: node.data,
      };
    });

    console.log('commandsArr', commandsArr);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTabId = tabs[0].id as number;
      chrome.tabs
        .sendMessage(activeTabId, {
          command: 'firstRunCommands',
          data: commandsArr,
        })
        .catch(() => {
          alert('Extension is not connected to the window, please reload the page.');
        });
    });
  };

  const getExecutionList = (data: Flow) => {
    const { nodes, edges } = data;
    const executionOrder: Node[] = [];

    const triggerNode = nodes.find((item) => item.type === 'trigger');

    if (triggerNode) {
      const nextNode = getOutgoers(triggerNode, nodes, edges);
      if (nextNode.length) {
        traverseNodes(triggerNode, nodes, edges, executionOrder);
        return executionOrder;
      }
    }
  };

  useEffect(() => {
    getSub();
  }, []);

  if (data.length < 1) {
    return <div>No script</div>;
  }
  return (
    <>
      {data.map((item: ScriptsList) => {
        const saveTime = new Date(item.saveTime?.seconds * 1000).toLocaleString('zh-TW', {
          hour12: false,
        });

        const executionList = getExecutionList(item.flow);

        const extensionVariableList = executionList?.filter(
          (item) => item.data.value === 'extensionVariable'
        );

        return (
          <div className='flex relative flex-col w-full items-center pr-7 mb-3  pl-7' key={item.id}>
            <div className=' flex w-full justify-between shadow-sm shadow-mainBlue-300 items-center rounded-lg border border-gray-300 hover:border-mainBlue-300 bg-white p-3'>
              <div className=' flex flex-col'>
                <span className='text-base text-mainBlue-400'>{item.name}</span>
                <span className='text-xs text-gray-400 font-normal'>{item.description}</span>
                {extensionVariableList?.map((item, index) => (
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
                <span className=' text-xs text-gray-400 font-normal mt-3'>Edited:{saveTime}</span>
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
      })}
    </>
  );
};

export default List;
