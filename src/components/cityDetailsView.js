import { fetchCityData } from "../api/fetchCityData"
import React, { useEffect, useState } from 'react'
import DetailCard from "./CityDetailCardComponent"
import WeatherDataChart from "./WeatherDataChart"

const CityDetails = ({ selectedCity }) => {
    const [cityForecastDetails, setCityForecastDetails] = useState(null)

    const fetchForecastByCity = async () => {
        try {
            const { latitude, longitude, name } = selectedCity
            const cityData = await fetchCityData(latitude, longitude)
            setCityForecastDetails(cityData ? { cityData, name } : null)
            console.log("cityData: ", cityData)
        } catch (error) {
            console.error('Error fetching city data:', error.message)
        }
    }

    useEffect(() => {
        if(selectedCity && selectedCity.latitude && selectedCity.longitude) {
            fetchForecastByCity()
        }
    }, [selectedCity])

    return (
        <>
            <div style={{justifyContent: 'space-around', height: '100%'}}>
                {cityForecastDetails ? (
                    <>
                        {console.log("city log in detail view", cityForecastDetails)}
                        <h2 className='city-details-h2'>{selectedCity.name}</h2>
                        <WeatherDataChart data={cityForecastDetails.cityData} />
                        <DetailCard>
                            <p>
                                Current temp: {cityForecastDetails.cityData.current.temp}°
                            </p>
                        </DetailCard>
                    </>
                ) : (
                    <p>Select a city to view the weather</p>
                )}
            </div>
        </>

    )
}

export default CityDetails