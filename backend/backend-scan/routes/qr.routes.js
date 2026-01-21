const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL pool
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

/* Delete QR record by ID */
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM records WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete record' });
  }
});

/* List all QR records */
router.get('/list', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        document_no,
        qr_token,
        is_valid,
        created_at
      FROM records
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
});

/* Generate QR */
router.post('/generate', async (req, res) => {
  try {
    const { name, document_no } = req.body;
    const token = uuidv4();

    await pool.query(
      `INSERT INTO records (name, document_no, qr_token)
       VALUES ($1, $2, $3)`,
      [name, document_no, token]
    );

    // ⚠️ IMPORTANT: use frontend URL, not localhost
    const qrURL = `https://your-username.github.io/verify/${token}`;
    const qrImage = await QRCode.toDataURL(qrURL);

    res.json({ token, qrImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate QR' });
  }
});

/* Verify QR */
router.get('/verify/:token', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT name, document_no, is_valid
       FROM records
       WHERE qr_token = $1`,
      [req.params.token]
    );

    if (result.rows.length === 0) {
      return res.json({ valid: false });
    }

    res.json({
      valid: result.rows[0].is_valid,
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed' });
  }
});

module.exports = router;
