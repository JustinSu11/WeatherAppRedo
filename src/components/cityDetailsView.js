import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CityDetails() {
    const [cityDetails, setCityDetails] = useState(null);
    const { cityName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityData = await fetchCityData(cityName);
                console.log('CityData: ', cityData);
                setCityDetails(cityData ? cityData.main : null);
            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        };

        fetchData();
    }, [cityName]);

    return (
        <>
            <div>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
            <div>
                <h2>{cityName}</h2>
                <p>
                    High: {cityDetails ? <span>{cityDetails.temp_max}</span> : <span>No data available</span>}
                </p>
            </div>
        </>

    )
}

export default CityDetails;