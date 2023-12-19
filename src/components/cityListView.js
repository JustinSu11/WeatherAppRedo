import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState } from 'react';
import './cityListView.css';

const cities = ['Austin', 'San Francisco', 'Jacksonville', 'New Jersey'];

function CityList() {
    // use for dynamic city list
    const [cityNames, setCityNames] = useState([]);

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

    return (
        <div>
            {cityNames.map(cityName => (
                <span key={cityName}>{cityName}</span>
            ))}
        </div>
    )
}

export default CityList;    