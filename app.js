require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');

const app = express();

// ✅ SET VIEW ENGINE DULU
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', './views');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));
app.use((req, res, next) => {
    res.locals.title = 'Admin Pembelian';
    next();
});
// routes
app.use('/produk', require('./routes/produk'));
app.use('/pembelian', require('./routes/pembelian'));
app.use('/chat', require('./routes/chat'));


// default route
app.get('/', (req, res) => {
    res.redirect('/produk');
});


// server
app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});

