CREATE DATABASE IF NOT EXISTS admin_pembelian;
USE admin_pembelian;

CREATE TABLE produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_produk VARCHAR(100),
    harga INT
);

CREATE TABLE stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produk_id INT,
    jumlah INT
);

CREATE TABLE pembelian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produk_id INT,
    qty INT,
    total INT,
    status ENUM('AKTIF','CANCEL') DEFAULT 'AKTIF'
);

INSERT INTO produk (nama_produk, harga) VALUES
('Kopi Arabika',50000),
('Kopi Robusta',45000),
('Teh Hijau',30000),
('Gula Pasir',15000),
('Susu UHT',18000),
('Coklat Bubuk',25000),
('Air Mineral',5000),
('Snack Kentang',12000),
('Biskuit',10000),
('Mie Instan',3500);

INSERT INTO stock (produk_id, jumlah)
SELECT id, 100 FROM produk;
