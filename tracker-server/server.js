const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express(); // Inisialisasi app
const port = 3000;

// Ganti dengan API Key Anda
const API_KEY = '8a104dc915bd42bcbef6fd7c38a95c6a';
const GEOCODING_URL = 'https://api.opencagedata.com/geocode/v1/json';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/update-location', async (req, res) => {
    const { latitude, longitude } = req.body;
    const userAgent = req.headers['user-agent']; // Mendapatkan User-Agent
    const ipAddress = req.ip; // Mendapatkan alamat IP pengguna
    const timestamp = new Date().toISOString(); // Timestamp saat lokasi diterima

    try {
        const response = await axios.get(GEOCODING_URL, {
            params: {
                q: `${latitude},${longitude}`,
                key: API_KEY,
                no_dedupe: 1,
                language: 'en'
            }
        });

        const data = response.data;
        if (data.results.length > 0) {
            const locationInfo = data.results[0];
            const formattedAddress = locationInfo.formatted; // Alamat lengkap
            const components = locationInfo.components; // Komponen alamat

            // Informasi tambahan
            const street = components.road || components.footway || components.path || 'Tidak ada informasi jalan';
            const city = components.city || components.town || components.village || 'Tidak ada informasi kota';
            const state = components.state || components.province || 'Tidak ada informasi provinsi';
            const country = components.country || 'Tidak ada informasi negara';
            const postcode = components.postcode || 'Tidak ada informasi kode pos';

            // Format tampilan di CMD
            console.log(`\n========== INFORMASI LOKASI DITERIMA ==========\n`);
            console.log(`🕒 Timestamp:         ${timestamp}`);
            console.log(`📍 Latitude:          ${latitude}`);
            console.log(`📍 Longitude:         ${longitude}`);
            console.log(`🌍 Alamat Lengkap:    ${formattedAddress}`);
            console.log(`🚗 Jalan:             ${street}`);
            console.log(`🏙️  Kota:             ${city}`);
            console.log(`🏞️  Provinsi:         ${state}`);
            console.log(`🌐 Negara:            ${country}`);
            console.log(`🏷️  Kode Pos:         ${postcode}`);
            console.log(`\n========== INFORMASI PENGGUNA ============\n`);
            console.log(`💻 User-Agent:        ${userAgent}`);
            console.log(`🌐 IP Address:        ${ipAddress}`);
            console.log(`\n==========================================\n`);

            res.json({
                status: 'success',
                location: {
                    fullAddress: formattedAddress,
                    street: street,
                    city: city,
                    state: state,
                    country: country,
                    postcode: postcode,
                    userAgent: userAgent,
                    ipAddress: ipAddress,
                    timestamp: timestamp
                }
            });
        } else {
            res.json({ status: 'error', message: 'Lokasi tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        res.status(500).json({ status: 'error', message: 'Terjadi kesalahan saat mendapatkan data lokasi' });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
