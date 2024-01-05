import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

const CityDetails = ({ selectedCity }) => {
    const [cityDetails, setCityDetails] = useState(null);
    // const { cityName } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityData = await fetchCityData(selectedCity);
                console.log('CityData: ', cityData);
                setCityDetails(cityData ? cityData.main : null);
            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        };

        fetchData();
    }, [selectedCity]);

    return (
        <>
            {/* <div>
                <button onClick={() => navigate('/')}>Back</button>
            </div> */}
            <div style={{justifyContent: 'space-around'}}>
                <h2>{selectedCity}</h2>
                {selectedCity ? (
                    <p>
                        High: {cityDetails ? <span>{cityDetails.temp_max}</span> : <span>No data available</span>}
                    </p>
                ) : (
                    <p>Select a city to view the weather</p>
                )}
                
            </div>
        </>

    )
}

export default CityDetails;