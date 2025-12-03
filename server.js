// server.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises; // Modul untuk membaca file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk menerima data JSON dari form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk menyajikan file statis (HTML, CSS, JS) dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// --- API ENDPOINTS ---

// Endpoint API untuk mendapatkan data proyek
// URL: http://localhost:3000/api/projects
app.get('/api/projects', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', 'projects.json'), 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data proyek.' });
    }
});

// Endpoint API untuk menerima pesan dari form kontak
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Di aplikasi nyata, Anda bisa mengirim email atau menyimpan ke database.
    // Untuk saat ini, kita cukup tampilkan di console server.
    console.log('--- Pesan Baru Diterima ---');
    console.log(`Nama: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Pesan: ${message}`);
    console.log('---------------------------');

    res.status(200).json({ message: 'Pesan Anda telah terkirim!' });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});