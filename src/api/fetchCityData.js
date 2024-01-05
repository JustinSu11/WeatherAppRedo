import axios from 'axios';

const apiKey = '8ea86cc19c6d3725c7fa06cfde3d4c8e';

export const fetchCityData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await axios.get(apiUrl);
        const cityData = response.data;
        console.log('City: ', cityData);
        return cityData;
    } catch (error) {
        console.error(`Error fetching data for ${city}:`, error.message);
        return null;
    }
};