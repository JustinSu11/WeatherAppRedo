import { fetchCityData } from "../api/fetchCityData"
import React, { useEffect, useState, useRef } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
import Card from "./cardComponent"
import DetailCard from "./CityDetailCardComponent"
import WeatherDataChart from "./WeatherDataChart"
import { fetchCityFromCoordinates } from "../api/fetchCityFromCoordinates"

const CityDetails = ({ selectedCityCoords, selectedCityName }) => {
    const [cityDetails, setCityDetails] = useState(null)
    const [weatherDataForChart, setWeatherDataForChart] = useState([])
    const [cityName, setCityName] = useState(selectedCityName)
    // const { cityName } = useParams();
    // const navigate = useNavigate();
    const selectedCityNameRef = useRef(selectedCityName)

    useEffect(() => {
        selectedCityNameRef.current = selectedCityName
    }, [selectedCityName])

    useEffect(() => {
        const fetchData = async () => {
            try {
                //takes selected city which is set by handleCityClick() retrieves weather data for city
                const { latitude, longitude } = selectedCityCoords
                console.log(`City latitude ${latitude} and longitude ${longitude}`)
                const cityData = await fetchCityData(latitude, longitude)
                console.log('CityData: ', cityData)
                selectedCityNameRef.current = await fetchCityFromCoordinates(latitude, longitude)
                setCityDetails(cityData ? cityData : null)
                setCityName(selectedCityNameRef.current)

                // Filter and set Weather Data for chart
                const filteredWeatherData = cityData.hourly.slice(0, 24)
                setWeatherDataForChart(filteredWeatherData)

            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        }

        fetchData()
    }, [selectedCityCoords, selectedCityNameRef])

    //Hourly forecast for 4 days returns a 'list' array and I need to sort by 'dt_txt' and organize it into a new array. Repeat with 'main.temp' then map through both arrays to have temp above the times.

    return (
        <>
            <div style={{justifyContent: 'space-around'}}>
                <DetailCard>
                    <h2 className='city-details-h2'>{cityName}</h2>
                    <WeatherDataChart data={weatherDataForChart}/>
                    <Card>
                        {cityName ? (
                            <>
                                <p>
                                    Current temp: {cityDetails ? <span>{cityDetails.current.temp}°</span> : <span>No data available</span>}
                                </p>
                            </>
                        ) : (
                            <p>Select a city to view the weather</p>
                        )}
                    </Card>
                </DetailCard>
            </div>
        </>

    )
}

export default CityDetails