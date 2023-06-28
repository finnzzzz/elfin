import List from './List';
const Page = async () => {
  return (
    <div className=' flex h-full justify-end'>
      <div className=' flex w-[350px] flex-col items-center  border border-black pb-3 pt-3 font-semibold'>
        <div className=' text-2xl'>Extension</div>
        <div className=' mb-1 text-2xl'>2</div>
        <List />
      </div>
    </div>
  );
};

export default Page;
