import axios from 'axios';

const apiKey = '8ea86cc19c6d3725c7fa06cfde3d4c8e';

export const fetchCityFromCoordinates = async (lat, lon) => {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = axios.get(apiUrl);
        console.log('City name: ', response.data);
        return response;
    } catch (error) {
        console.log(`Error fetching city name for ${lat} and ${lon}: `, error.message);
    }
}