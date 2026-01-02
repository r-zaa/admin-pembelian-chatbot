const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'admin_pembelian',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); 

module.exports = db;
