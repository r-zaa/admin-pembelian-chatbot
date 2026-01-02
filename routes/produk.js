const express = require('express');
const router = express.Router();
const db = require('../config/db'); // sudah promise

// GET semua produk + stock
router.get('/', async (req, res) => {
    try {
        const [data] = await db.execute(`
            SELECT *, stock.jumlah, produk.id as id_produk, stock.id as id_stock 
            FROM produk 
            LEFT JOIN stock ON produk.id = stock.produk_id
        `);
        res.render('produk', { title: 'Produk', data });
    } catch (err) {
        console.error(err);
        res.send('Terjadi error saat mengambil data produk.');
    }
});

// Tambah produk
router.post('/tambah', async (req, res) => {
    try {
        let { nama_produk, harga, jumlah } = req.body;
        harga = harga.replace(/\./g, ''); // hapus titik ribuan

        // 1. Insert ke produk
        const [result] = await db.execute(
            'INSERT INTO produk (nama_produk, harga) VALUES (?, ?)',
            [nama_produk, harga]
        );

        const produk_id = result.insertId;

        // 2. Insert stok awal
        await db.execute(
            'INSERT INTO stock (produk_id, jumlah) VALUES (?, ?)',
            [produk_id, jumlah]
        );

        res.redirect('/produk');
    } catch (err) {
        console.error(err);
        res.send('Terjadi error saat menambah produk.');
    }
});

// Hapus produk + stock
router.post('/hapus/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.execute('DELETE FROM stock WHERE produk_id = ?', [id]);
        await db.execute('DELETE FROM produk WHERE id = ?', [id]);
        res.redirect('/produk');
    } catch (err) {
        console.error(err);
        res.send('Terjadi error saat menghapus produk.');
    }
});

// Update produk + stock
router.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    let { nama_produk, harga, jumlah } = req.body;
    harga = harga.replace(/\./g, '');

    try {
        await db.execute(
            'UPDATE produk SET nama_produk=?, harga=? WHERE id=?',
            [nama_produk, harga, id]
        );

        // Insert stock jika belum ada, atau update jika sudah ada
        await db.execute(
            `
            INSERT INTO stock (produk_id, jumlah)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE jumlah = ?
            `,
            [id, jumlah, jumlah]
        );

        res.redirect('/produk');
    } catch (err) {
        console.error(err);
        res.send('Terjadi error saat mengupdate produk.');
    }
});

module.exports = router;
