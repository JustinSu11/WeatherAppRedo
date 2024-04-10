import CityDetails from "./cityDetailsView"
import CityList from "./cityListView"
import React, { useState, useEffect, useRef } from "react"
import './components.css'
import { fetchCoordsFromName } from "../api/fetchCoordsFromName"
import { popularCities } from "../configuration/config"

function WeatherDashboard() {
    const [userLocation, setUserLocation] = useState(null)
    const [selectedCityCoords, setSelectedCityCoords] = useState(popularCities[0])
    const [selectedCityName, setSelectedCityName] = useState("")
    const [citiesCoords, setCitiesCoords] = useState([...popularCities])
    const [locationFound, setLocationFound] = useState(false)

    const userLocationRef = useRef(userLocation)

    const handleCityClick = async (cityName) => {
        setSelectedCityName(cityName)
        console.log(`SelectedCityName from weatherDashboard: ${cityName}`)
        const CityCoords = await fetchCoordsFromName(cityName)
        setSelectedCityCoords(CityCoords)
    }

    useEffect(() => {
        userLocationRef.current = userLocation
    }, [userLocation])

    const fetchUserLocation = async () => {
        try {
            //retrieve user's location in coordinates
            if (navigator.geolocation) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                })

                const { latitude, longitude } = position.coords
                const newUserLocationCoordinates = { latitude, longitude }
                setUserLocation(newUserLocationCoordinates)
                setSelectedCityCoords(newUserLocationCoordinates)

                //retrieve coordinates of popular cities and adds them to the cities coords array
                setCitiesCoords([newUserLocationCoordinates, ...citiesCoords])

            }
        } catch (error) {
            console.error('Error fetching user location: ', error.message)
        } finally {
            setLocationFound(true)
        }
    }

    return (
        <div className='two-column-container'>
            <div className='column-1'>
                {locationFound ?  (
                    <CityList citiesCoords={citiesCoords} onCityClick={handleCityClick} />
                ) : (
                    <>
                    <button onClick={() => fetchUserLocation()}>My Location</button>
                    <CityList citiesCoords={citiesCoords} onCityClick={handleCityClick} />
                    </>
                )}
            </div>
            <div className='column-2'>
                    <CityDetails selectedCityCoords={selectedCityCoords} selectedCityName={selectedCityName} />
            </div>
        </div>
    )
}

export default WeatherDashboard