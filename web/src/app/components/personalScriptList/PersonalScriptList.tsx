import Link from 'next/link';
import { useCallback, useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { IoIosClose } from 'react-icons/io';

import asyncDeleteWorkflow from '@/app/api/workflowData/asyncDeleteWorkflow';
import asyncUpdateWorkflow from '@/app/api/workflowData/asyncUpdateWorkflow';

import useUserStore from '@/app/user_store';

const PersonalScriptList = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  const uid = userInfo.userUid;
  const userRef = collection(db, 'users', uid, 'scripts');
  const q = query(userRef, orderBy('saveTime', 'desc'));
  const [workflowSnapShots, loading, error] = useCollection(q);

  const [description, setDescription] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const desObj: { [key: string]: string } = {};
    workflowSnapShots?.docs.map((item) => {
      const id: string = item.data().id;
      const des: string = item.data().description;
      desObj[id] = des;
    });
    setDescription(desObj);
  }, [workflowSnapShots]);

  const deleteScript = (
    uid: string,
    id: string,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    asyncDeleteWorkflow(uid, id);
  };

  const personalScripts = workflowSnapShots?.docs.filter((item) => item.data().isTemplate !== true);

  const saveScriptDescription = useCallback(
    async (uid: string, id: string, e: React.FocusEvent<HTMLInputElement>) => {
      const description = e.target.value;
      await asyncUpdateWorkflow(uid, id, { description });
    },
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className=' background-image-blue flex flex-wrap justify-center gap-9 rounded-md p-4 sm:justify-start sm:p-11'>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {personalScripts?.map((item) => {
          const saveTimeSeconds = item.data().saveTime?.seconds;
          const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
          return (
            <div className='' key={item.id}>
              <div className=' relative h-[180px] w-[250px] sm:h-[210px] sm:w-[290px]'>
                <div className=' ml-auto h-[70px] w-[70%] rounded-[20px] border border-gray-300 bg-white '></div>
                <span
                  className='  absolute right-4 top-2 cursor-pointer text-gray-400 hover:text-gray-700'
                  onClick={(e) => {
                    deleteScript(userInfo.userUid, item.id, e);
                  }}
                >
                  <IoIosClose size='20px' />
                </span>
                <div className=' scriptListShadow absolute bottom-0 h-[150px] w-[250px] rounded-[20px] border border-gray-300 bg-white p-4 sm:h-[180px] sm:w-[290px]'>
                  <div className=' scriptList-block-bg  mb-4 h-[30px] w-[100px] rounded-[10px] '></div>
                  <div className=' flex h-[70%] flex-col justify-between'>
                    <div className=' flex flex-col'>
                      <Link href={`/edit/${item.id}`} key={item.id}>
                        <span className=' text-md hover:underline'>{item.data().name}</span>
                      </Link>
                      <input
                        id='description'
                        placeholder='description'
                        name={item.id}
                        maxLength={26}
                        className=' rounded-sm text-gray-400 outline-none focus:underline '
                        value={description[item.id]}
                        onChange={handleChange}
                        onBlur={(e) => {
                          saveScriptDescription(userInfo.userUid, item?.id, e);
                        }}
                      />
                    </div>
                    <span className=' mt-1 self-end text-xs text-gray-500'>Edited：{saveTime}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {personalScripts?.length == 0 && (
          <div className='  flex h-[210px] w-full items-center justify-center'>
            <span className=' text-gray-600'>no script 📁</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalScriptList;
