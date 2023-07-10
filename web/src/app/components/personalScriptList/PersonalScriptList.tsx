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
  return (
    <>
      {/* <div className=' mb-4'>PersonalScriptList</div> */}
      <div className=' background-image-blue flex flex-wrap justify-start gap-4 rounded-md p-5'>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {workflowSnapShots?.docs.map((item) => {
          const saveTimeSeconds = item.data().saveTime?.seconds;
          const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
          return (
            <div className='flex flex-col items-end' key={item.id}>
              {/* <button
                onClick={() => {
                  deleteScript(userInfo.userUid, item.id);
                }}
                className=' mb-1 w-fit rounded-md border border-red-300 bg-red-100 p-1 text-sm '
              >
                delete
              </button> */}

              <Link href={`/edit/${item.id}`}>
                <div className=' relative h-[100px] w-[250px] rounded-md border border-[#d2e4fa] bg-white hover:border-[#a1bbda]'>
                  <span
                    className='  absolute right-2 top-2 text-gray-400 hover:text-gray-700'
                    onClick={(e) => {
                      deleteScript(userInfo.userUid, item.id, e);
                    }}
                  >
                    <IoIosClose size='20px' />
                  </span>

                  <div className=' m-5 flex flex-col '>
                    <div className=' flex items-center'>
                      <span className=' mb-2 text-md'>{item.data().name}</span>
                    </div>
                    {/* <span className=' mb-2 text-sm'>{item.data().id}</span> */}
                    <input
                      type='text'
                      className=' mb-2 text-sm text-gray-400 outline-none focus:underline'
                      placeholder='description'
                      maxLength={27}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </div>
                </div>
              </Link>
              <span className=' mt-1 text-xs'>Edited：{saveTime}</span>
            </div>
          );
        })}
        {workflowSnapShots?.docs.length == 0 && <div>no scripts</div>}
      </div>
    </>
  );
};

export default PersonalScriptList;
