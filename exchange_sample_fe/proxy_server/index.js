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

const generateTrades = (basePrice = 100, asArray = false) => {
  const trades = [];
  for (let i = 0; i < 10; i++) {
    if (asArray) {
      trades.push([
        Date.now() - i * 60000,                // timestamp
        randomFloat(basePrice - 1, basePrice + 1), // price
        randomFloat(0.1, 3),                   // qty
        Math.random() > 0.5 ? 'buy' : 'sell'   // side
      ]);
    } else {
      trades.push({
        price: randomFloat(basePrice - 1, basePrice + 1),
        qty: randomFloat(0.1, 3),
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        timestamp: Date.now() - i * 60000,
      });
    }
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

    klines.push([
      now - i * 60000, // start
      open,
      high,
      low,
      close,
      volume,
      now - (i - 1) * 60000 // end
    ]);
  }
  return klines.reverse();
};

app.get('/api/orderbook', (req, res) => {
  const basePrice = randomFloat(102, 104);
  res.json(generateOrderBook(basePrice, true));
});

app.get('/api/price', (req, res) => {
  res.json({ price: randomFloat(102, 104), timestamp: Date.now() });
});

app.get('/api/trades', (req, res) => {
  res.json(generateTrades(103)); // objects
});

// v1 endpoints used by frontend
app.get('/api/v1/depth', (req, res) => {
  const basePrice = randomFloat(102, 104);
  res.json(generateOrderBook(basePrice));
});

app.get('/api/v1/trades', (req, res) => {
  res.json(generateTrades(103, false)); // objects, not arrays
});

app.get('/api/v1/klines', (req, res) => {
  const raw = generateKlines(103);
  const mapped = raw.map(([start, open, high, low, close, volume, end]) => ({
    open: open.toString(),
    high: high.toString(),
    low: low.toString(),
    close: close.toString(),
    start,
    end,
    volume: volume.toString(),
  }));
  res.json(mapped);
});

app.get('/api/v1/markets', (req, res) => {
  res.json(['BTCUSDT', 'ETHUSDT', 'DOGEUSDT']);
});

app.get('/api/v1/tickers', (req, res) => {
  res.json([
    { symbol: 'BTCUSDT', price: randomFloat(102, 104) },
    { symbol: 'ETHUSDT', price: randomFloat(1500, 1600) },
    { symbol: 'DOGEUSDT', price: randomFloat(0.05, 0.1) }
  ]);
});

const port = 3001;
app.listen(port, () =>
  console.log(`✅ Dummy exchange running at http://localhost:${port}`)
);
