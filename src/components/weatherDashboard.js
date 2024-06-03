import CityDetails from "./cityDetailsView"
import CityList from "./cityListView"
import React, { useState, useEffect } from "react"
import './components.css'
import { fetchCityFromCoordinates } from "../api/fetchCityFromCoordinates"
import { popularCities } from "../configuration/config"

function WeatherDashboard() {
    const [userLocation, setUserLocation] = useState(null)
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState()
    const [locationFound, setLocationFound] = useState(false)
    const [citiesWithoutNames, setCitiesWithoutNames] = useState([...popularCities])

    const handleCityClick = async (latitude, longitude) => {
        const city = cities.find((city) => city.latitude === latitude && city.longitude === longitude)
        setSelectedCity(city)
        console.log('Selected city: ', selectedCity)
    }

    //Add to cities if city doesn't exist already
    // const addToCities = (latitude, longitude, name) => {
    //     const existingCityIndex = cities.findIndex((city) => city.latitude === latitude && city.longitude === longitude)
    //     if(existingCityIndex === -1) {
    //         setCities((prevCities) => [...prevCities, {latitude: latitude, longitude: longitude, name: name}])
    //     }
    // }

    const fetchUserLocation = async () => {
        try {
            if (navigator.geolocation) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                })
                const { latitude, longitude } = position.coords
                const newUserLocationCoordinates = { latitude: latitude, longitude: longitude }
                setUserLocation(newUserLocationCoordinates)
            }
        } catch (error) {
            console.error('Error fetching user location: ', error.message)
        } finally {
            setLocationFound(true)
        }
    }
    
    useEffect(() => {
        const updateCityNames = async () => {
          try {
            const updatedCities = await Promise.all(
              citiesWithoutNames.map(async (cityCoords) => {
                const { latitude, longitude } = cityCoords
                const cityName = await fetchCityFromCoordinates(latitude, longitude)
                return { latitude: latitude, longitude: longitude, name: cityName }
              })
            )
            //update cities state
            setCities((prevCities) => [...updatedCities, ...prevCities.filter((city) => !updatedCities.some((updatedCity) => updatedCity.name === city.name))])
            //remove processed entries from citiesWithoutNames state
            setCitiesWithoutNames((prevCitiesWithoutNames) =>
                prevCitiesWithoutNames.filter((city) => !updatedCities.some((updatedCity) => updatedCity.latitude === city.latitude && updatedCity.longitude === city.longitude))
            )
          } catch (error) {
            console.error('Error fetching city data:', error.message)
          }
        }
      
        // Call updateCityNames only when citiesWithoutNames changes
        if (citiesWithoutNames.length > 0) {
          updateCityNames()
        }
      
    }, [citiesWithoutNames])

    useEffect(() => {
        if(cities.length > 0) {
            setSelectedCity(cities[0])
        }
        cities.map((city) => console.log(city.name, city.latitude, city.longitude))
    }, [cities])

    useEffect(() => {
        if(locationFound){
            //retrieve coordinates of popular cities and adds them to the cities coords array
            setCitiesWithoutNames((prevCitiesWithoutNames) => [{latitude: userLocation.latitude, longitude: userLocation.longitude}, ...prevCitiesWithoutNames])
        }
    }, [locationFound, userLocation])

    return (
        <div className='two-column-container'>
            <div className='column-1'>
                {locationFound ? (
                    <CityList cities={cities} onCityClick={handleCityClick}/>
                ) : (
                        <>
                            <button onClick={() => fetchUserLocation()}>My Location</button>
                            <CityList cities={cities} onCityClick={handleCityClick}/>
                        </>
                )}
            </div>
            <div className='column-2'>
                {selectedCity ? (
                    <CityDetails selectedCity={selectedCity} />
                ) : (
                    <p>Please select a city to view the weather details.</p>
                )}
            </div>
        </div>
    )
}

export default WeatherDashboard