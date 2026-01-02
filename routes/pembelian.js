const express = require('express');
const router = express.Router();
const db = require('../config/db'); // promise pool

// Tampil data pembelian & produk
router.get('/', async (req, res) => {
    try {
        const [dataPembelian] = await db.execute(`
            SELECT pembelian.*, produk.nama_produk, stock.jumlah
            FROM pembelian
            LEFT JOIN produk ON produk.id = pembelian.produk_id
            LEFT JOIN stock ON stock.produk_id = produk.id
        `);

        const [dataProduk] = await db.execute(`
            SELECT produk.*, stock.jumlah
            FROM produk
            LEFT JOIN stock ON stock.produk_id = produk.id
        `);

        res.render('pembelian', {
            title: 'Pembelian',
            data: dataPembelian,
            data2: dataProduk
        });
    } catch (err) {
        console.error(err);
        res.send('Terjadi error saat mengambil data pembelian.');
    }
});

// Tambah pembelian
router.post('/tambah', async (req, res) => {
    try {
        const { produk_id, qty } = req.body;

        const [produk] = await db.execute(
            'SELECT harga FROM produk WHERE id=?',
            [produk_id]
        );

        if (!produk[0]) return res.send('Produk tidak ditemukan.');

        const total = produk[0].harga * qty;

        await db.execute(
            'INSERT INTO pembelian (produk_id, qty, total) VALUES (?,?,?)',
            [produk_id, qty, total]
        );

        await db.execute(
            'UPDATE stock SET jumlah = jumlah - ? WHERE produk_id=?',
            [qty, produk_id]
        );

        res.redirect('/pembelian');
    } catch (err) {
        console.error(err);
        res.send('Terjadi error saat menambah pembelian.');
    }
});

// Cancel pembelian
router.get('/cancel/:id', async (req, res) => {
    try {
        const [r] = await db.execute(
            'SELECT * FROM pembelian WHERE id=?',
            [req.params.id]
        );

        if (!r[0]) return res.send('Data pembelian tidak ditemukan.');

        const p = r[0];

        await db.execute('UPDATE pembelian SET status="CANCEL" WHERE id=?', [p.id]);
        await db.execute(
            'UPDATE stock SET jumlah = jumlah + ? WHERE produk_id=?',
            [p.qty, p.produk_id]
        );

        res.redirect('/pembelian');
    } catch (err) {
        console.error(err);
        res.send('Terjadi error saat membatalkan pembelian.');
    }
});

module.exports = router;

