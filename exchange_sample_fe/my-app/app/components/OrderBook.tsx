import React from "react";
import OrderBookDispay from "./orderBookDispay";

export default async function OrderBook() {
  const res = await fetch("http://localhost:3001/api/orderbook", {
    cache: "no-store",
  });
  const currprice = await fetch("http://localhost:3001/api/price", {
    cache: "no-store",
  });
  const data = await res.json();
  const currentprice = await currprice.json();

  if (!data || !currentprice) {
    return <div>Loading...</div>;
  }
  console.log(data, currentprice);

  return (
    <div>
      <OrderBookDispay currentPrice={currentprice.price} bits={data.bids} asks={data.asks}/>
    </div>
  );
}
