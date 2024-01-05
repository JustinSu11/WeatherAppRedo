import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState } from 'react';
import './components.css';
// import { useNavigate } from 'react-router-dom';
import Card from "./cardComponent";

const cities = ['Austin', 'San Francisco', 'Jacksonville', 'New Jersey'];

const CityList = ({ onCityClick }) => {
    // use for dynamic city list
    const [cityNames, setCityNames] = useState([]);
    // const navigate = useNavigate();

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

    // const handleCityClick = (cityName) => {
    //     navigate(`/${cityName}`);
    // }

    return (
        <div className='vertical-scroll-container'>
            {cityNames.map(cityName => (
                <div key={cityName} onClick={() => onCityClick(cityName)} style={{ cursor: 'pointer' }} className='city-list-navigation'>
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

export default CityList;    