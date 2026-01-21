require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// QR routes
app.use('/api/qr', require('./routes/qr.routes'));

const PORT = process.env.PORT  || 3000;;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
