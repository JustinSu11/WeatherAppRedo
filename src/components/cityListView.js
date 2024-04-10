// import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState, /*useRef*/ } from 'react'
import './components.css'
// import { useNavigate } from 'react-router-dom';
import Card from "./cardComponent"
import { fetchCityFromCoordinates } from "../api/fetchCityFromCoordinates"

const CityList = ({ citiesCoords, onCityClick }) => {
    // use for dynamic city list
    const [cityNames, setCityNames] = useState([])

    //search bar
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = citiesCoords.map(async (cityCoords) => {
                    const { latitude, longitude } = cityCoords
                    console.log(`This is your latitude: ${latitude} and longitude: ${longitude}`)
                    try {
                        const cityName = await fetchCityFromCoordinates(latitude, longitude)
                        console.log('City Name from list: ', cityName)
                        return cityName
                    } catch (error) {
                        console.error(`Error fetching name for (${latitude}, ${longitude}):  `, error.message)
                        return null
                    }
                })
                const resolvedCityNames = await Promise.all(promises)
                setCityNames(resolvedCityNames.filter(name => name !== null))
            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        }

        fetchData()
    }, [citiesCoords])

    // const handleCityClick = (cityName) => {
    //     navigate(`/${cityName}`);
    // }

    return (
        <div className='vertical-scroll-container'>
            {cityNames.map(cityName => (
                <div key={cityName} onClick={() => onCityClick(cityName)} style={{ cursor: 'pointer', width: '200px', height: '100px'}} className='city-list-navigation'>
                    <Card>
                        <h3>
                            {cityName}
                        </h3>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default CityList    