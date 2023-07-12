import Link from 'next/link';
import { db } from '@/app/lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { IoIosClose } from 'react-icons/io';

import asyncDeleteWorkflow from '@/app/api/workflowData/asyncDeleteWorkflow';

import useStore from '@/app/user_store';

const PersonalScriptList = () => {
  const userInfo = useStore((state) => state.userInfo);

  const uid = userInfo.userUid;

  const userRef = collection(db, 'users', uid, 'scripts');
  const q = query(userRef, orderBy('saveTime', 'desc'));
  const [workflowSnapShots, loading, error] = useCollection(q);

  console.log('psl', workflowSnapShots?.docs);

  const deleteScript = (
    uid: string,
    id: string,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    asyncDeleteWorkflow(uid, id);
    console.log('delete');
  };

  const personalScripts = workflowSnapShots?.docs.filter(
    (item) => item.data().isTemplate !== 'true'
  );
  return (
    <>
      <div className=' background-image-blue flex flex-wrap justify-start gap-9 rounded-md p-9'>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {personalScripts?.map((item) => {
          const saveTimeSeconds = item.data().saveTime?.seconds;
          const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
          return (
            <div className='' key={item.id}>
              <div className=' relative h-[210px] w-[290px]'>
                <div className=' ml-auto h-[70px] w-[70%] rounded-[20px] border border-gray-300 bg-white '></div>
                <span
                  className='  absolute right-4 top-2 cursor-pointer text-gray-400 hover:text-gray-700'
                  onClick={(e) => {
                    deleteScript(userInfo.userUid, item.id, e);
                  }}
                >
                  <IoIosClose size='20px' />
                </span>
                <div className=' scriptListShadow absolute bottom-0 h-[180px] w-[290px] rounded-[20px] border border-gray-300 bg-white p-4'>
                  <div className=' scriptList-block-bg  mb-4 h-[30px] w-[100px] rounded-[10px] '></div>
                  <div className=' flex h-[70%] flex-col justify-between'>
                    <div className=' flex flex-col'>
                      <Link href={`/edit/${item.id}`} key={item.id}>
                        <span className=' text-md hover:underline'>{item.data().name}</span>
                      </Link>
                      <input
                        id='description'
                        name='clickDescription'
                        // onChange={descriptionChange}
                        // value={stashDescription}
                        // onBlur={setDescription}
                        maxLength={21}
                        placeholder='description'
                        className=' rounded-sm text-gray-400 outline-none focus:underline '
                      />
                    </div>
                    <span className=' mt-1 self-end text-xs text-gray-500'>Edited：{saveTime}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {workflowSnapShots?.docs.length == 0 && <div>no scripts</div>}
      </div>
    </>
  );
};

export default PersonalScriptList;
