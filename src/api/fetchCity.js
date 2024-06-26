import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

export const fetchCityFromCoordinates = async (lat, lon) => {
    const apiUrl = 'https://api.openweathermap.org/geo/1.0/reverse'
    const delay = 250
    await new Promise((resolve => setTimeout(resolve, delay)))

    try {
        const response = await axios.get(apiUrl, { params: { lat: lat, lon: lon, appid: apiKey}})
        console.log('API Response:', response)

        if (response.data && response.data[0] && response.data[0].name) {
            const cityName = response.data[0].name
            console.log('City name: ', cityName)
            return cityName
        } else {
            console.error('Invalid response format:', response)
            return null
        }
    } catch (error) {
        console.error(`Error fetching city name for ${lat} and ${lon}: `, error.message)
        throw error
    }
}

export const fetchCoordsFromName = async (cityName) => {
    const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct'

    try {
        const response = await axios.get(apiUrl, { params: {q: cityName, limit: '5', appid: apiKey}})
        console.log('Api response: ', response)
        const latitude = response.data[0].lat
        const longitude = response.data[0].lon
        return { latitude, longitude }
    } catch (error) {
        console.log(`Error fetching latitude and longitude for ${cityName}`)
        throw error
    }
}