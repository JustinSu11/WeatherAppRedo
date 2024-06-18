import CityDetails from './CityDetails'
import CityList from './CityList'
import React, { useState, useEffect } from 'react'
import './weatherDashboard.css'
import { fetchCityFromCoordinates } from '../api/fetchCity'
import { popularCities } from '../configuration/config'
import { useLocation } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import { Divider, Button } from '@mui/material'

function WeatherDashboard() {
    const [userLocation, setUserLocation] = useState(null)
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState()
    const [locationFound, setLocationFound] = useState(false)
    const [citiesWithoutNames, setCitiesWithoutNames] = useState([...popularCities])

    const location = useLocation()

    const handleCityClick = async (latitude, longitude) => {
        const city = cities.find((city) => city.latitude === latitude && city.longitude === longitude)
        setSelectedCity(city)
        console.log('Selected city: ', selectedCity)
    }

    // Add to cities if city doesn't exist already
    const addToCities = (latitude, longitude, name) => {
        const newCity = {latitude: latitude, longitude: longitude, name: name}
        
        if(!cities.find((city) => city.name === name)){
            console.log('Adding new city:', { latitude, longitude, name }) 
            setCities((prevCities) => [{ latitude: parseFloat(latitude), longitude: parseFloat(longitude), name }, ...prevCities.filter((city) => newCity.name !== city.name)])
        }
        setSelectedCity(cities[0])
    } 

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
                return addToCities(latitude, longitude, cityName)
              })
            )
            citiesWithoutNames.slice((prevCitiesWithoutNames) => prevCitiesWithoutNames.filter((city) => updatedCities.some((updatedCity) => updatedCity.latitude === city.latitude && updatedCity.longitude === city.longitude)))
            const params = new URLSearchParams(location.search)
            const city = params.get('city')
            const lat = params.get('lat')
            const lon = params.get('lon')

            if (city && lat && lon) {
                if (!cities.find((c) => c.name === city && c.latitude === parseFloat(lat) && c.longitude === parseFloat(lon))) {
                    addToCities(parseFloat(lat), parseFloat(lon), city)
                } else {
                    setSelectedCity({ name: city, latitude: parseFloat(lat), longitude: parseFloat(lon) })
                }
            }
          } catch (error) {
            console.error('Error fetching city data:', error.message)
          }
        }
      
        // Call updateCityNames only when citiesWithoutNames changes
        if (citiesWithoutNames.length > 0) {
            updateCityNames()
        }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [citiesWithoutNames])

    useEffect(() => {
        if(locationFound && userLocation){
            const existingUserLocation = citiesWithoutNames.find((city) => city.latitude === userLocation.latitude && city.longitude === userLocation.longitude)
            if(!existingUserLocation){
                setCitiesWithoutNames((prevCitiesWithoutNames) => [{latitude: userLocation.latitude, longitude: userLocation.longitude}, ...prevCitiesWithoutNames])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationFound])

    //fuck this shit

    useEffect(() => {
        if(cities.length > 0) {
            setSelectedCity(cities[0])
        }
        cities.map((city) => console.log(city.name, city.latitude, city.longitude))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities])

    return (
        <Grid container spacing={2}>
            <Grid xs={2}>
                {locationFound ? (
                    <CityList cities={cities} onCityClick={handleCityClick}/>
                ) : (
                        <>
                            <Button variant='contained' size='small' onClick={() => fetchUserLocation()}>My Location</Button>
                            <CityList cities={cities} onCityClick={handleCityClick}/>
                        </>
                )}
            </Grid>
            <Divider variant='middle' orientation='vertical' flexItem sx={{borderColor: 'black', borderWidth: '1px', opacity: 0.6}}/>
            <Grid xs={9}>
                {selectedCity ? (
                    <CityDetails selectedCity={selectedCity} />
                ) : (
                    <p>Please select a city to view the weather details.</p>
                )}
            </Grid>
        </Grid>
    )
}

export default WeatherDashboard