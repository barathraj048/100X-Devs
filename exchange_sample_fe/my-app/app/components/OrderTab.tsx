'use client';
import React, { useState } from "react";

enum OrderType {
  Buy = "buy",
  Sell = "sell",
}

enum OrderMode {
  Limit = "limit",
  Market = "market",
}

function OrderTab() {
  const [orderType, setOrderType] = useState<OrderType>(OrderType.Buy);
  const [orderMode, setOrderMode] = useState<OrderMode>(OrderMode.Limit);
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();

  return (
    <div className="w-80 bg-black text-white rounded-lg border border-gray-700 font-sans ">

      <div className="flex mb-3 border-b border-gray-700">
        <button
          onClick={() => setOrderType(OrderType.Buy)}
          className={`flex-1 py-2 font-semibold ${
            orderType === OrderType.Buy
              ? "border-b-2 border-green-500 text-green-400"
              : "text-gray-400"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setOrderType(OrderType.Sell)}
          className={`flex-1 py-2 font-semibold ${
            orderType === OrderType.Sell
              ? "border-b-2 border-red-500 text-red-400"
              : "text-gray-400"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="flex mb-4 border-b border-gray-700">
        <button
          onClick={() => setOrderMode(OrderMode.Limit)}
          className={`flex-1 py-1 ${
            orderMode === OrderMode.Limit
              ? "border-b-2 border-white"
              : "text-gray-400"
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderMode(OrderMode.Market)}
          className={`flex-1 py-1 ${
            orderMode === OrderMode.Market
              ? "border-b-2 border-white"
              : "text-gray-400"
          }`}
        >
          Market
        </button>
      </div>
      <div className="text-xs text-gray-400 mb-2">
        Available Balance <span className="float-right">36.94 USDC</span>
      </div>

      {orderMode === OrderMode.Limit && (
        <div className="flex items-center bg-gray-900 border border-gray-700 rounded p-2 mb-3">
          <input
            type="number"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="flex-1 bg-transparent outline-none text-white"
          />
        </div>
      )}

      <div className="flex items-center bg-gray-900 border border-gray-700 rounded p-2 mb-1">
        <input
          type="number"
          value={quantity}
          placeholder="Quantity"
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
          className="flex-1 bg-transparent outline-none text-white"
        />
      </div>

      <div className="text-xs text-gray-400 mb-3">
        ≈ {(orderMode === OrderMode.Market ? 0 : price || 0 * quantity || 0).toFixed(2)} USDC
      </div>

      <div className="flex justify-between mb-4">
        {["25%", "50%", "75%", "Max"].map((pct) => (
          <button
            key={pct}
            className="flex-1 mx-1 py-1 bg-gray-800 rounded text-xs text-gray-300 hover:bg-gray-700"
          >
            {pct}
          </button>
        ))}
      </div>

      <button
        className={`w-full py-2 rounded font-bold ${
          orderType === OrderType.Buy
            ? "bg-green-600 hover:bg-green-500"
            : "bg-red-600 hover:bg-red-500"
        }`}
      >
        {orderType === OrderType.Buy ? "Buy" : "Sell"}
      </button>

      <div className="flex mt-3 text-xs text-gray-400 gap-4">
        <label className="flex items-center gap-1">
          <input type="checkbox" className="accent-green-500" /> Post Only
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="accent-green-500" /> IOC
        </label>
      </div>
    </div>
  );
}

export default OrderTab;
