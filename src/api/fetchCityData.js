import axios from 'axios'
import { fetchCityFromCoordinates } from './fetchCityFromCoordinates'

const apiKey = process.env.REACT_APP_API_KEY

export const fetchCityData = async (latitude, longitude) => {
    const apiUrl = process.env.REACT_APP_API_URL

    try {
        console.log(`API Key: ${apiKey}`)
        const response = await axios.get(apiUrl, { params: { lat: latitude, lon: longitude, units: 'imperial', exclude: 'minutely', appid: apiKey }})
        const cityData = response.data
        console.log('City: ', cityData)
        return cityData
    } catch (error) {
        console.error(`Error fetching data for ${fetchCityFromCoordinates(latitude, longitude)}:`, error.message)
        throw error
    }
}

