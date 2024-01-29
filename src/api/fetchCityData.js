import axios from 'axios';
import { fetchCityFromCoordinates } from './fetchCityFromCoordinates';

const apiKey = '8ea86cc19c6d3725c7fa06cfde3d4c8e';

export const fetchCityData = async (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,alerts&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const cityData = response.data;
        console.log('City: ', cityData);
        return cityData;
    } catch (error) {
        console.error(`Error fetching data for ${fetchCityFromCoordinates(latitude, longitude)}:`, error.message);
        throw error;
    }
};

