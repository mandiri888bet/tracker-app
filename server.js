const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Selamat datang di server pelacakan! Akses /track untuk melacak lokasi.');
});

app.get('/track', async (req, res) => {
    const ip = req.ip; // Menggunakan IP pengguna
    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ip}&key=8a104dc915bd42bcbef6fd7c38a95c6a`);
        const data = response.data.results[0];
        const address = data.formatted;
        const latitude = data.geometry.lat;
        const longitude = data.geometry.lng;

        res.json({
            message: 'Lokasi pengguna berdasarkan IP',
            ip: ip,
            address: address,
            latitude: latitude,
            longitude: longitude
        });
    } catch (error) {
        console.error('Error getting location:', error);
        res.status(500).json({ message: 'Gagal mendapatkan data lokasi' });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});
