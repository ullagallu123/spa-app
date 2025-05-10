const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db-config');
const redis = require('./redis-client');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(bodyParser.json());

// CORS Configuration
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
console.log('CORS Allowed Origin:', ALLOWED_ORIGIN);

// Preflight
app.options('/api/entries', cors());

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).send(`
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
        <h1 style="color: green;">Server is healthy</h1>
      </body>
    </html>
  `);
});

// Fetch All Entries with Redis Cache
app.get('/api/entries', async (req, res) => {
  try {
    const cacheKey = 'all_entries';
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log('Serving from Redis cache');
      return res.json(JSON.parse(cachedData));
    } else {
      console.log('Cache miss: No cache found, fetching from database');
    }

    db.query('SELECT * FROM entries', async (err, results) => {
      if (err) {
        console.error('Database Fetch Error:', err);
        return res.status(500).send({ error: 'Internal Server Error' });
      }

      console.log('Serving from Database and caching the result');
      await redis.set(cacheKey, JSON.stringify(results), 'EX', 300); // Cache for 1 minute
      res.json(results);
    });
  } catch (err) {
    console.error('Redis Fetch Error:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


app.get('/debug/redis', async (req, res) => {
  try {
    const keys = await redis.keys('*');
    const entries = await Promise.all(
      keys.map(async (key) => {
        const type = await redis.type(key);
        let value;
        if (type === 'string') value = await redis.get(key);
        return { key, type, value };
      })
    );
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Redis debug failed', details: err.message });
  }
});


// Add New Entry
app.post('/api/entries', (req, res) => {
  const { amount, description } = req.body;

  if (!amount || !description) {
    return res.status(400).send({ error: 'Amount and description are required' });
  }

  const query = 'INSERT INTO entries (amount, description) VALUES (?, ?)';
  db.query(query, [amount, description], async (err, result) => {
    if (err) {
      console.error('Database Insert Error:', err);
      return res.status(500).send({ error: 'Failed to insert entry' });
    }

    console.log('Inserted entry with ID:', result.insertId);

    // Clear the cache because data changed
    await redis.del('all_entries');
    console.log('Cache cleared for all_entries');

    res.status(201).send({ id: result.insertId, amount, description });
  });
});

// Delete Entry by ID
app.delete('/api/entries/:id', (req, res) => {
  const entryId = req.params.id;

  const query = 'DELETE FROM entries WHERE id = ?';
  db.query(query, [entryId], async (err, result) => {
    if (err) {
      console.error('Database Delete Error:', err);
      return res.status(500).send({ error: 'Failed to delete entry' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Entry not found' });
    }

    console.log('Deleted entry with ID:', entryId);

    // Clear the cache because data changed
    await redis.del('all_entries');
    console.log('Cache cleared for all_entries');

    res.send({ message: 'Entry deleted successfully' });
  });
});

// Start Server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});


// redis-cli GET all_entries
