const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();

// Middleware
app.use(bodyParser.json());

// Database configuration
const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server',
  database: 'your_database',
};

// Routes
app.get('/api/frecuencia-ventas', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM FrecuenciaVentasOverall');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching data from FrecuenciaVentasOverall:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/last-transactions', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM LastTransactions');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching data from LastTransactions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
