import CityDetails from "./cityDetailsView";
import CityList from "./cityListView";
import React, { useState, useEffect } from "react";
import './components.css'

function WeatherDashboard() {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedCity, setSelectedCity] = useState(userLocation);
    const [isLoading, setIsLoading] = useState(true);
    const [citiesCoords, setCitiesCoords] = useState([])

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                if (navigator.geolocation) {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });

                    const { latitude, longitude } = position.coords;
                    const newUserLocation = { latitude, longitude }
                    setUserLocation(newUserLocation);
                    setCitiesCoords([newUserLocation])
                }
            } catch (error) {
                console.error('Error fetching user location: ', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserLocation();
    }, [userLocation])

    const handleCityClick = (cityName) => {
        setSelectedCity(cityName);
    }

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
                    <CityDetails selectedCity={selectedCity} />
                )}
            </div>
        </div>
    )
}

export default WeatherDashboard;