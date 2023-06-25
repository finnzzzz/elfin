import Link from 'next/link';

const getData = async () => {
  const workflowData = await fetch(`http:localhost:3000/api/workflowData/`, {
    cache: 'no-store',
  });
  return workflowData.json();
};

export default async function Home() {
  const workflows = await getData();
  console.log('22', workflows.data);
  return (
    <div className='p-5'>
      <div className=' text-xl text-slate-500'>hello world</div>
      <div>Add new</div>
      <div className=' text-xl'>All workflow</div>
      <div className=' flex gap-4'>
        {workflows.data
          ? workflows.data.map((item) => {
              return (
                <Link href={`/edit/${item.id}`} key={item.id}>
                  <div className=' flex flex-col items-center rounded-lg border border-blue-500 p-3'>
                    <span className=' mb-2'>{item.name}</span>
                    <span>上次修改時間：{item.time}</span>
                  </div>
                </Link>
              );
            })
          : 'nodata'}
      </div>
    </div>
  );
}
