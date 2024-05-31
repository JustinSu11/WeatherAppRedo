import { fetchCityData } from "../api/fetchCityData"
import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
import DetailCard from "./CityDetailCardComponent"
// import DetailAttributesCard from "./CityDetailAttributesCardComponent"
import WeatherDataChart from "./WeatherDataChart"
// import { fetchCityFromCoordinates } from "../api/fetchCityFromCoordinates"

const CityDetails = ({ selectedCity }) => {
    const [cityDetails, setCityDetails] = useState(null)
    const [weatherDataForChart, setWeatherDataForChart] = useState([])
    const [cityName, setCityName] = useState(selectedCity.name)
    const [selectedWeatherAttribute, setSelectedWeatherAttribute] = useState('temp')
    // const { cityName } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if(selectedCity && selectedCity.latitude && selectedCity.longitude) {
                try {
                    //takes selected city which is set by handleCityClick() retrieves weather data for city
                    console.log(`City latitude ${selectedCity.latitude} and longitude ${selectedCity.longitude}`)
                    const cityData = await fetchCityData(selectedCity.latitude, selectedCity.longitude)
                    console.log('CityData: ', cityData)
                    setCityDetails(cityData ? cityData : null)
                    setCityName(selectedCity.name)

                    // Filter and set Weather Data for chart
                    const filteredWeatherData = cityData.hourly.slice(0, 12)
                    setWeatherDataForChart(filteredWeatherData)

                } catch (error) {
                    console.error('Error fetching city data:', error.message)
                }
            }
        }

        fetchData()
    }, [selectedCity])

    //Transform data to recharts format
    const transformedData = weatherDataForChart.map(dataPoint => ({
        name: new Date(dataPoint.dt * 1000).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit', hour12: true}),
        value: dataPoint[selectedWeatherAttribute],
        unit: (selectedWeatherAttribute === 'temp' || selectedWeatherAttribute === 'feels_like' ? '°' : selectedWeatherAttribute === 'humidity' ? '%' : null),
    }))

        //takes in the selected filter value and sets the weather attribute to the selected value
    const handleFilterChange = (event) => {
        setSelectedWeatherAttribute(event.target.value)
    }

    //Hourly forecast for 4 days returns a 'list' array and I need to sort by 'dt_txt' and organize it into a new array. Repeat with 'main.temp' then map through both arrays to have temp above the times.

    return (
        <>
            <div style={{justifyContent: 'space-around', height: '100%'}}>
                <h2 className='city-details-h2'>{cityName}</h2>
                <WeatherDataChart data={transformedData} onChange={handleFilterChange} selectedWeatherAttribute={selectedWeatherAttribute} />
                <DetailCard>
                    {/* <DetailAttributesCard> */}
                        {cityName ? (
                            <>
                                <p>
                                    Current temp: {cityDetails ? <span>{cityDetails.current.temp}°</span> : <span>No data available</span>}
                                </p>
                            </>
                        ) : (
                            <p>Select a city to view the weather</p>
                        )}
                    {/* </DetailAttributesCard> */}
                </DetailCard>
            </div>
        </>

    )
}

export default CityDetails