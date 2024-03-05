import CityDetails from "./cityDetailsView"
import CityList from "./cityListView"
import React, { useState, useEffect, useRef } from "react"
import './components.css'
import { fetchCoordsFromName } from "../api/fetchCoordsFromName"
import { fetchCityFromCoordinates } from "../api/fetchCityFromCoordinates"

function WeatherDashboard() {
    const [userLocation, setUserLocation] = useState(null)
    const [selectedCityCoords, setSelectedCityCoords] = useState(userLocation)
    const [selectedCityName, setSelectedCityName] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [citiesCoords, setCitiesCoords] = useState([])

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

    useEffect(() => {
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
                    const popularCities = ["New York", "Tokyo", "London", "Paris"]
                    const coordsPromises = popularCities.map(async (cityName) => {
                        const cityCoords = await fetchCoordsFromName(cityName)
                        return cityCoords
                    })
                    const resolvedCityCoords = await Promise.all(coordsPromises)
                    setCitiesCoords([newUserLocationCoordinates, ...resolvedCityCoords])

                    //Show weather data for first city on city list which should always be user's location
                    const newUserLocationCityName = await fetchCityFromCoordinates(latitude, longitude)
                    handleCityClick(newUserLocationCityName)
                }
            } catch (error) {
                console.error('Error fetching user location: ', error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserLocation()
    }, [userLocationRef])

    return (
        <div className='two-column-container'>
            <div className='column-1'>
                {isLoading ?  (
                    <p>Loading...</p>
                ) : (
                    <CityList citiesCoords={citiesCoords} onCityClick={handleCityClick} />
                )}
            </div>
            <div className='column-2'>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <CityDetails selectedCityCoords={selectedCityCoords} selectedCityName={selectedCityName} />
                )}
            </div>
        </div>
    )
}

export default WeatherDashboard