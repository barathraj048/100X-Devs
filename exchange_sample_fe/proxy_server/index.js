const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*', methods: ['GET'] }));

// ---------- helpers ----------
const randomFloat = (min, max, decimals = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const generateOrderBook = (basePrice = 100, withCumulative = false) => {
  const bids = [];
  const asks = [];

  for (let i = 0; i < 10; i++) {
    bids.push([randomFloat(basePrice - 2, basePrice - 0.1), randomFloat(0.1, 5)]);
    asks.push([randomFloat(basePrice + 0.1, basePrice + 2), randomFloat(0.1, 5)]);
  }

  bids.sort((a, b) => b[0] - a[0]);
  asks.sort((a, b) => a[0] - b[0]);

  if (withCumulative) {
    let bidTotal = 0;
    bids.forEach(b => {
      bidTotal += b[1];
      b.push(Math.round(bidTotal * 100) / 100);
    });

    let askTotal = 0;
    asks.forEach(a => {
      askTotal += a[1];
      a.push(Math.round(askTotal * 100) / 100);
    });
  }

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

const generateKlines = (basePrice = 100) => {
  const klines = [];
  const now = Date.now();
  for (let i = 0; i < 30; i++) {
    const open = randomFloat(basePrice - 1, basePrice + 1);
    const close = randomFloat(basePrice - 1, basePrice + 1);
    const high = Math.max(open, close) + randomFloat(0, 0.5);
    const low = Math.min(open, close) - randomFloat(0, 0.5);
    const volume = randomFloat(1, 20);

    klines.push({
      open: open.toString(),
      high: high.toString(),
      low: low.toString(),
      close: close.toString(),
      start: now - i * 60000,
      end: now - (i - 1) * 60000,
      volume: volume.toString(),
    });
  }
  return klines.reverse();
};

// ---------- frontend matching endpoints ----------

// GET /tickers
app.get('/tickers', (req, res) => {
  res.json([
    { symbol: 'BTCUSDT', price: randomFloat(102, 104) },
    { symbol: 'ETHUSDT', price: randomFloat(1500, 1600) },
    { symbol: 'DOGEUSDT', price: randomFloat(0.05, 0.1) }
  ]);
});

// GET /depth?symbol=BTCUSDT
app.get('/depth', (req, res) => {
  const basePrice = randomFloat(102, 104);
  res.json(generateOrderBook(basePrice));
});

// GET /trades?symbol=BTCUSDT
app.get('/trades', (req, res) => {
  res.json(generateTrades(103));
});

// GET /klines?symbol=BTCUSDT&interval=1m&startTime=...&endTime=...
app.get('/klines', (req, res) => {
  res.json(generateKlines(103));
});

const port = 3000; // ✅ match frontend BASE_URL
app.listen(port, () =>
  console.log(`✅ Backend aligned with frontend at http://localhost:${port}`)
);
