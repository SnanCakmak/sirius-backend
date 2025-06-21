
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sirius Backend Çalışıyor');
});

app.get('/api/trendyol/products', async (req, res) => {
  try {
    const response = await axios.get('https://api.trendyol.com/sapigw/suppliers/123456/products', {
      headers: {
        'Authorization': `Basic ${process.env.TRENDYOL_API_KEY}`,
        'User-Agent': 'axios',
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Veri çekilemedi', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
