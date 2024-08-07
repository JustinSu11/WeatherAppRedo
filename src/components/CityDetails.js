import { fetchCityForecast } from "../api/fetchCityForecast"
import React, { useEffect, useState } from 'react'
import WeatherDataChart from "./WeatherDataChart"
import './cityDetails.css'
import { useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material'

const CityDetails = ({ selectedCity }) => {
    const [cityForecastDetails, setCityForecastDetails] = useState(null)
    const navigate = useNavigate()

    const fetchForecastByCity = async () => {
        try {
            const { latitude, longitude, name } = selectedCity
            const cityData = await fetchCityForecast(latitude, longitude)
            setCityForecastDetails(cityData ? { cityData, name } : null)
            console.log("cityData: ", cityData)

            const queryParams = new URLSearchParams({city: name, lat: latitude, lon: longitude}).toString()
            navigate(`?${queryParams}`)
        } catch (error) {
            console.error('Error fetching city data:', error.message)
        }
    }

    useEffect(() => {
        if(selectedCity && selectedCity.latitude && selectedCity.longitude) {
            fetchForecastByCity()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    return (
        <>
            <div style={{justifyContent: 'space-around', height: '100%'}}>
                {cityForecastDetails ? (
                    <>
                        <h2 className='city-details-h2'>{selectedCity.name}</h2>
                        <WeatherDataChart data={cityForecastDetails.cityData} />
                        <Paper elevation={16} className='attributes-container'>
                            <p>
                                Current temp: {cityForecastDetails.cityData.current.temp}°
                            </p>
                        </Paper>
                    </>
                ) : (
                    <p>Select a city to view the weather</p>
                )}
            </div>
        </>

    )
}

export default CityDetails