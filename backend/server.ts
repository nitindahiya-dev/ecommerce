// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./src/db');

const app = express();

// Initialize database (drizzle)
initDb();

app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'E-commerce API is running' });
});

// More endpoints (e.g., products, users, orders) can go here.
// For example: app.use('/api/products', require('./src/routes/products'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
