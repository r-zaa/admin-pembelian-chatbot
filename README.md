# Admin Pembelian & Chatbot AI

## Deskripsi
Project ini dibuat sebagai hasil tes teknis yang terdiri dari:

### Tes 1 – Sistem Admin Pembelian
Fitur:
- CRUD Produk
- Manajemen Stock
- Input Pembelian
- Cancel Pembelian (stok otomatis kembali)
- Database MySQL
- Node.js + Express + EJS

### Tes 2 – Chatbot AI Admin
Chatbot sederhana yang:
- Terintegrasi dengan AI (Ollama / LLM)
- Bisa menjawab pertanyaan seputar:
  - Data produk
  - Stock barang
  - Riwayat pembelian

---

## Teknologi
- Node.js
- Express.js
- EJS
- MySQL
- Axios
- Ollama (LLM local)

---

## Cara Menjalankan Project

### 1. Clone Repository
``bash
git clone https://github.com/r-zaa/admin-pembelian-chatbot.git
cd admin-pembelian-chatbot

### 2. Install Dependency
``bash
npm install 

### 3. Setup Database
Buat database: admin_pembelian

Import file SQL (jika ada)

Atur koneksi database di: config/db.js

### 4. Jalankan Server
``bash
npm start
Akses di browser:http://localhost:(port name)


### Catatan
File .env tidak disertakan demi keamanan

Pastikan MySQL dan Ollama sudah berjalan

### Author

Nama: Muhammad Fahreza Saidasmawan


