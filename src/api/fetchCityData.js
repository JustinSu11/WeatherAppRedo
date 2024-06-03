import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

export const fetchCityData = (latitude, longitude) => {
    const apiUrl = process.env.REACT_APP_API_URL
    return axios.get(apiUrl, { params: { lat: latitude, lon: longitude, units: 'imperial', exclude: 'minutely', appid: apiKey }})
    .then(response => response.data)
    .catch(error => {
        console.log('Error fetching data in fetchCityData: ', error)
    })
}

