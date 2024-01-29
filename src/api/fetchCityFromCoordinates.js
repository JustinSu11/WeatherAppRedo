import axios from 'axios';

const apiKey = '8ea86cc19c6d3725c7fa06cfde3d4c8e';

export const fetchCityFromCoordinates = async (lat, lon) => {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        console.log(`latitude from fetchCityFromCoordinates ${lat}, ${lon}`)
        const response = await axios.get(apiUrl);
        console.log('API Response:', response);

        if (response.data && response.data[0] && response.data[0].name) {
            const cityName = response.data[0].name;
            console.log('City name: ', cityName);
            return cityName;
        } else {
            console.error('Invalid response format:', response);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching city name for ${lat} and ${lon}: `, error.message);
        throw error; // Re-throw the error to propagate it
    }
};
