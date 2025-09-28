import React from "react";

interface OrderBookDisplayProps {
  bits: Array<[number, number, number]>; 
  currentPrice: number;
  asks: Array<[number, number, number]>;
}

function OrderBookDispay({ bits, currentPrice, asks }: OrderBookDisplayProps) {
  const totalBits = bits[bits.length - 1][2];
  const totalAsks = asks[asks.length - 1][2];

  if (!bits?.length || !asks?.length || currentPrice == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-1">
      {bits.map((bit, index) => {
        const cumulativePercent = 100-((bit[2] / totalBits) * 100)
        const rowPercent = (bit[1] / totalBits) * 100; 
        return (
          <div key={index} className="relative flex justify-between">
            <div
              className="absolute top-0 left-0 h-full bg-red-400 opacity-20"
              style={{ width: `${cumulativePercent}%` }}
            />
            <div
              className="absolute top-0 left-0 h-full bg-red-500 opacity-40"
              style={{ width: `${rowPercent}%` }}
            />
            <div className="relative flex justify-between w-full">
              <div className="text-sm">{bit[0].toFixed(2)}</div>
              <div className="text-sm">{bit[1].toFixed(2)}</div>
              <div className="text-sm">{bit[2].toFixed(2)}</div>
            </div>
          </div>
        );
      })}
      <div className="text-lg my-2 flex gap-4 ">{currentPrice} <div className="text-sm items-center"></div></div>

      {asks.map((ask, index) => {
        const cumulativePercent =  ((ask[2] / totalAsks) * 100)
        const rowPercent = (ask[1] / totalAsks) * 100;
        return (
          <div key={index} className="relative flex justify-between">
            <div
              className="absolute top-0 left-0 h-full bg-green-400 opacity-20"
              style={{ width: `${cumulativePercent}%` }}
            />
            <div
              className="absolute top-0 left-0 h-full bg-green-500 opacity-40"
              style={{ width: `${rowPercent}%` }}
            />
            <div className="relative flex justify-between w-full">
              <div className="text-sm">{ask[0].toFixed(2)}</div>
              <div className="text-sm">{ask[1].toFixed(2)}</div>
              <div className="text-sm">{ask[2].toFixed(2)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderBookDispay;
