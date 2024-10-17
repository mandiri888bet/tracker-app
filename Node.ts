Node.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/track', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Lokasi diterima: Latitude: ${latitude}, Longitude: ${longitude}`);
    res.send({ message: 'Lokasi diterima', latitude, longitude });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
