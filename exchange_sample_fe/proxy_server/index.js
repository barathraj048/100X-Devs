const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*', methods: ['GET'] }));

const randomFloat = (min, max, decimals = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const generateOrderBook = (basePrice = 100) => {
  const bids = [];
  const asks = [];

  for (let i = 0; i < 10; i++) {
    bids.push([randomFloat(basePrice - 2, basePrice - 0.1), randomFloat(0.1, 5)]);
    asks.push([randomFloat(basePrice + 0.1, basePrice + 2), randomFloat(0.1, 5)]);
  }

  bids.sort((a, b) => b[0] - a[0]);
  asks.sort((a, b) => a[0] - b[0]);

  return { bids, asks };
};

const generateTrades = (basePrice = 100) => {
  const trades = [];
  for (let i = 0; i < 10; i++) {
    trades.push({
      price: randomFloat(basePrice - 1, basePrice + 1),
      qty: randomFloat(0.1, 3),
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      timestamp: Date.now() - i * 60000,
    });
  }
  return trades;
};

app.get('/api/orderbook', (req, res) => {
  const basePrice = randomFloat(102, 104); 
  let orderbook=generateOrderBook(basePrice)
  let bit=0
  orderbook.bids.forEach(element => {
    bit += element[1]
    bit=Math.round(bit * 100) / 100; 
    element.push(bit)
  });
  let ask=0
  orderbook.asks.forEach(element => {
    ask += element[1]
    ask=Math.round(ask * 100) / 100;
    element.push(ask)
  })
  res.json(orderbook);
});

app.get('/api/price', (req, res) => {
  res.json({ price: randomFloat(102, 104), timestamp: Date.now() });
});

app.get('/api/trades', (req, res) => {
  res.json(generateTrades(102));
});

const port = 3001;
app.listen(port, () => console.log(`✅ Dummy exchange running at http://localhost:${port}`));
