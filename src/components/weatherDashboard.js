import CityDetails from "./cityDetailsView";
import CityList from "./cityListView";
import React, { useState } from "react";
import './components.css'

function WeatherDashboard() {
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCityClick = (cityName) => {
        setSelectedCity((prevCity) => (prevCity === cityName ? null : cityName));
    }

    return (
        <div className='two-column-container'>
            <div className='column-1'>
                <CityList onCityClick={handleCityClick} />
            </div>
            <div className='column-2'>
                <CityDetails selectedCity={selectedCity} />
            </div>
        </div>
    )
}

export default WeatherDashboard;