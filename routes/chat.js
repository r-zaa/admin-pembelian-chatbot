const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../config/db');

// GET halaman chat
router.get('/', (req, res) => {
    res.render('chat', {
        response: null,
        userMessage: null,
        title: 'Chat AI'
    });
});

// POST untuk AJAX → return JSON
router.post('/json', async (req, res) => {
    const userMessage = req.body?.message || '';
    if (!userMessage) return res.json({ response: 'Pesan kosong.' });

    try {
        // Ambil data produk
        const [produk] = await db.execute('SELECT id, nama_produk, harga FROM produk');
        const produkData = produk.map(p => `${p.nama_produk} (ID:${p.id}) = Rp${p.harga}`).join(', ');

        // Ambil data stock
        const [stock] = await db.execute('SELECT produk_id, jumlah FROM stock');
        const stockData = stock.map(s => {
            const p = produk.find(x => x.id === s.produk_id);
            return `${p?.nama || 'Unknown'} = ${s.jumlah} pcs`;
        }).join(', ');

        // Ambil data pembelian
        const [pembelian] = await db.execute(
            'SELECT p.produk_id, p.qty, p.total, p.status FROM pembelian p'
        );
        const pembelianData = pembelian.map(b => {
            const p = produk.find(x => x.id === b.produk_id);
            return `${p?.nama || 'Unknown'}: ${b.qty} total ${b.total} (Status: ${b.status})`;
        }).join('; ');

        // Buat prompt untuk AI
        const prompt = `
Kamu adalah chatbot admin toko. Jawab semua pertanyaan dalam BAHASA INDONESIA secara singkat dan jelas.
Data Produk: ${produkData}
Data Stock: ${stockData}
Data Pembelian: ${pembelianData}

Pertanyaan user: ${userMessage}
Jawaban AI:
`;

        // Kirim ke Ollama
        const ollamaRes = await axios.post(
            'http://127.0.0.1:11434/api/generate',
            { model: 'llama3.2', prompt, stream: false }
        );

        res.json({ response: ollamaRes.data.response });

    } catch(err) {
        console.error('ERROR:', err.response ? err.response.data : err.message);
        res.json({ response: 'AI sedang bermasalah.' });
    }
});


module.exports = router;
