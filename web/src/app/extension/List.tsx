'use client';

import { useEffect, useState } from 'react';

const List = () => {
  const [listData, setListData] = useState([]);

  const fetchz = async () => {
    const data = await fetch('http://localhost:3000/api/workflowData/get-data');
    const dataa = await data.json();
    setListData(dataa);
    console.log(dataa);
  };

  useEffect(() => {
    fetchz();
  }, []);

  const update = () => {
    fetchz();
    console.log('updateee');
  };

  return (
    <>
      <button onClick={update}>update</button>
      {listData?.map((item: any) => (
        <div
          className=' mt-1 w-[90%] rounded-md border border-orange-400 p-3'
          key={item.id}
        >
          <div>{item.id}</div>
          <div className=' flex items-center justify-between'>
            <div>{item.name}</div>
            <div>{item.saveTime.seconds}</div>
            <button className=' border border-orange-400 p-1'>start</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default List;
