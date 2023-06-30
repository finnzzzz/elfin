import List from './List';

const Home = () => {
  return (
    <div className=' flex h-full justify-end'>
      <div className=' flex w-[350px] flex-col items-center  border border-black pb-3 pt-3 font-semibold'>
        <div className=' text-2xl'>Extension</div>
        <List />
      </div>
    </div>
  );
};

export default Home;
