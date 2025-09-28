"use client"
import React, { useEffect, useState } from 'react';
import image from '../../public/file.svg';

function Info() {
  const [currPrice, setCurrPrice] = useState(0.0);

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch("http://localhost:3001/api/price", { cache: "no-store" });
      const currentPrice = await res.json();
      setCurrPrice(currentPrice.price);
    };
    fetchPrice();
  }, []);

  return (
    <div className='gap-6 flex py-2'>
      <div className='flex relative items-center justify-center'>
        <img src={image} alt="" width={32} height={32} className='rounded-full absolute left-4 bg-white'/>
        <img src={image} alt="" width={32} height={32} className='rounded-full bg-white'/>
      </div>
      <div className='flex justify-between items-center gap-6'>
        <div className='text-sm font-semibold'>BTC/USDT</div>
        <div className='text-sm font-semibold'>$ {currPrice.toFixed(2)}</div>
        <div className='text-sm font-semibold w-fit'>
          <h1 className='text-xs text-gray-400 flex items-center justify-center'>24h Changes</h1>
          <h2 className='flex items-center justify-center text-red-400'>-0.98% - 0.02%</h2>
        </div>
        <div className='text-sm font-semibold w-fit'>
          <h1 className='text-xs text-gray-400 flex items-center justify-center'>24h High</h1>
          <h2 className='flex items-center justify-center '>96.23</h2>
        </div>
        <div className='text-sm font-semibold w-fit'>
          <h1 className='text-xs text-gray-400 flex items-center justify-center'>24h Low</h1>
          <h2 className='flex items-center justify-center '>96.12</h2>
        </div>
        <div className='text-sm font-semibold w-fit'>
          <h1 className='text-xs text-gray-400 flex items-center justify-center'>24h Volume</h1>
          <h2 className='flex items-center justify-center'>6213.4</h2>
        </div>
      </div>
    </div>
  );
}

export default Info;
