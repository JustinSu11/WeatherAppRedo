import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState } from 'react';
import './cityList.css';
import { useNavigate } from 'react-router-dom';

const cities = ['Austin', 'San Francisco', 'Jacksonville', 'New Jersey'];

function CityList() {
    // use for dynamic city list
    const [cityNames, setCityNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = cities.map(async city => {
                    const cityData = await fetchCityData(city);
                    return cityData ? cityData.name : null;
                });
                const resolvedCityNames = await Promise.all(promises);
                setCityNames(resolvedCityNames.filter(name => name !== null));
            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        };

        fetchData();
    }, []);

    const handleCityClick = (cityName) => {
        navigate(`/city/${cityName}`);
    }

    return (
        <div>
            {cityNames.map(cityName => (
                <span key={cityName} onClick={() => handleCityClick(cityName)} style={{ margin: '5px', cursor: 'pointer' }}>{cityName}</span>
            ))}
        </div>
    )
}

export default CityList;    