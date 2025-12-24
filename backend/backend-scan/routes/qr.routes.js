const express = require('express');
const router = express.Router();
const pool = require('../db'); // mysql2 pool
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');


/* Delete QR record by ID */
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM records WHERE id = ?',
    // 'UPDATE records SET is_valid = 0 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
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
    const [rows] = await pool.query(`
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

    res.json(rows);
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
      `INSERT INTO records (name, document_no, qr_token) VALUES (?, ?, ?)`,
      [name, document_no, token]
    );

    const qrURL = `http://localhost:4200/verify/${token}`;
    const qrImage = await QRCode.toDataURL(qrURL);

    res.json({ token, qrImage });

  } catch (err) {
    res.status(500).json(err);
  }
});

/* Verify QR */
router.get('/verify/:token', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT name, document_no, is_valid FROM records WHERE qr_token = ?`,
      [req.params.token]
    );

    if (rows.length === 0) {
      return res.json({ valid: false });
    }

    res.json({
      valid: rows[0].is_valid,
      data: rows[0]
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
