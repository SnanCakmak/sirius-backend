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

app.get('/api/pazarama/products', async (req, res) => {
  try {
    const sellerId = process.env.PAZARAMA_SELLER_ID;
    const apiKey = process.env.PAZARAMA_API_KEY;
    const apiSecret = process.env.PAZARAMA_API_SECRET;

    const response = await axios.get(`https://api.pazarama.com/v1/sellers/${sellerId}/products`, {
      headers: {
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
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
