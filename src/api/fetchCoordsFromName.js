import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchCoordsFromName = async (cityName) => {
    const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct';

    try {
        const response = await axios.get(apiUrl, { params: {q: cityName, limit: '5', appid: apiKey}});
        console.log('Api response: ', response);
        const latitude = response.data[0].lat
        const longitude = response.data[0].lon
        return { latitude, longitude }
    } catch (error) {
        console.log(`Error fetching latitude and longitude for ${cityName}`);
        throw error;
    }
}