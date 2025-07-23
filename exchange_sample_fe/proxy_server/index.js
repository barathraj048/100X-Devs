const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*', methods: ['GET'] }));

// Utility: generate random float with decimals
const randomFloat = (min, max, decimals = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// === DUMMY DATA GENERATORS ===

// Generate 10 bids & asks
const generateOrderBook = (basePrice = 100) => {
  const bids = [];
  const asks = [];

  for (let i = 0; i < 10; i++) {
    bids.push([randomFloat(basePrice - 2, basePrice - 0.1), randomFloat(0.1, 5)]);
    asks.push([randomFloat(basePrice + 0.1, basePrice + 2), randomFloat(0.1, 5)]);
  }

  // Sort bids descending by price, asks ascending by price (like real order books)
  bids.sort((a, b) => b[0] - a[0]);
  asks.sort((a, b) => a[0] - b[0]);

  return { bids, asks };
};

// Generate recent trades
const generateTrades = (basePrice = 100) => {
  const trades = [];
  for (let i = 0; i < 10; i++) {
    trades.push({
      price: randomFloat(basePrice - 1, basePrice + 1),
      qty: randomFloat(0.1, 3),
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      timestamp: Date.now() - i * 60000, // each trade 1 min apart
    });
  }
  return trades;
};

// === ENDPOINTS ===

// Orderbook
app.get('/api/orderbook', (req, res) => {
  const basePrice = randomFloat(99, 101); // simulate small fluctuations
  res.json(generateOrderBook(basePrice));
});

// Current Price (mid-price)
app.get('/api/price', (req, res) => {
  res.json({ price: randomFloat(99, 101), timestamp: Date.now() });
});

// Recent Trades
app.get('/api/trades', (req, res) => {
  res.json(generateTrades(100));
});

const port = 3000;
app.listen(port, () => console.log(`✅ Dummy exchange running at http://localhost:${port}`));
