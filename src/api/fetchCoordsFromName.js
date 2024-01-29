import axios from 'axios';

const apiKey = '8ea86cc19c6d3725c7fa06cfde3d4c8e';

export const fetchCoordsFromName = async (cityName) => {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        console.log(`Api response: ${response}`);

    } catch (error) {
        console.log(`Error fetching latitude and longitude for ${cityName}`);
        throw error;
    }
}