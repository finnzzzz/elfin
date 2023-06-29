import { db } from '../../lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

const List = () => {
  const workflowRef = collection(db, 'workflowtest');
  const q = query(workflowRef, orderBy('saveTime', 'desc'));
  const [workflowSnapShots, loading, error] = useCollection(q);

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
      {workflowSnapShots?.docs
        ? workflowSnapShots.docs.map((item) => {
            const saveTimeSeconds = item.data().saveTime?.seconds;
            const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
            return (
              <div className='flex flex-col' key={item.id}>
                <button>delete</button>
                <div className=' flex w-[250px] flex-col items-center rounded-lg border border-blue-500 bg-slate-200 p-3'>
                  <span className=' mb-2'>{item.data().name}</span>
                  <span className=' mb-2'>{item.data().id}</span>
                  <span>上次修改時間：{saveTime}</span>
                </div>
              </div>
            );
          })
        : 'nodata'}
    </>
  );
};

export default List;
