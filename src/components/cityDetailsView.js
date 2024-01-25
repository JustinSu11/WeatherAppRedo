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
                const { latitude, longitude } = selectedCity;
                const cityData = await fetchCityData(latitude, longitude);
                console.log('CityData: ', cityData);
                setCityDetails(cityData ? cityData : null);
            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        };

        fetchData();
    }, [selectedCity]);

    //Hourly forecast for 4 days returns a 'list' array and I need to sort by 'dt_txt' and organize it into a new array. Repeat with 'main.temp' then map through both arrays to have temp above the times.

    return (
        <>
            {/* <div>
                <button onClick={() => navigate('/')}>Back</button>
            </div> */}
            <div style={{justifyContent: 'space-around'}}>
                <h2>{selectedCity}</h2>
                {selectedCity ? (
                    <>
                        <p>
                            High: {cityDetails ? <span>{cityDetails.main.temp_max}</span> : <span>No data available</span>}
                        </p>
                        <p>
                            Low: {cityDetails ? <span>{cityDetails.main.temp_min}</span> : <span>No data available</span>}
                        </p>
                        <p>
                            Humidity: {cityDetails ? <span>{cityDetails.main.humidity}%</span> : <span>No data available</span>}
                        </p>
                        <p>
                            Wind: {cityDetails ? <span>{cityDetails.wind.speed}mph</span> : <span>No data available</span>}
                        </p>
                    </>
                ) : (
                    <p>Select a city to view the weather</p>
                )}
                
            </div>
        </>

    )
}

export default CityDetails;