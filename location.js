const axios = require('axios');

const ip = '114.10.26.180'; // Ganti dengan IP yang ingin dilacak
const apiKey = '8a104dc915bd42bcbef6fd7c38a95c6a'; // Ganti dengan kunci OpenCage Anda

async function getLocation(ip) {
    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ip}&key=${apiKey}`);
        const locationData = response.data;

        if (locationData.results.length > 0) {
            const result = locationData.results[0];
            console.log(`Alamat: ${result.formatted}`);
            console.log(`Latitude: ${result.geometry.lat}`);
            console.log(`Longitude: ${result.geometry.lng}`);
        } else {
            console.log('Lokasi tidak ditemukan.');
        }
    } catch (error) {
        console.error("Error getting location:", error);
    }
}

getLocation(ip);
