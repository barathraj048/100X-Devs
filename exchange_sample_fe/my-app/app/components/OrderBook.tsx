import React from "react";

export default async function OrderBook() {
  const res = await fetch("http://localhost:3001/api/orderbook", {
    cache: "no-store",
  });
  const currprice = await fetch("http://localhost:3001/api/price", {
    cache: "no-store",
  });
  const data = await res.json();
  const currentprice = await currprice.json();

  return (
    <div>
      {data.bids.map((bit:any, index:any) => (
        <div key={index} className="flex justify-between">
          <div className="text-sm font-semibold ">{bit[0].toFixed(2)}</div>
          <div className="text-sm font-semibold ">{bit[1].toFixed(2)}</div>
          <div className="text-sm font-semibold ">{bit[2].toFixed(2)}</div>
        </div>
      ))}
      {currentprice}
        {data.asks.map((bit:any, index:any) => (
        <div key={index} className="flex justify-between">
          <div className="text-sm font-semibold ">{bit[0].toFixed(2)}</div>
          <div className="text-sm font-semibold ">{bit[1].toFixed(2)}</div>
          <div className="text-sm font-semibold ">{bit[2].toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
