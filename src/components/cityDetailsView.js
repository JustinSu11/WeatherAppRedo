import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

const CityDetails = ({ selectedCityCoords, selectedCityName }) => {
    const [cityDetails, setCityDetails] = useState(null);
    // const { cityName } = useParams();
    // const navigate = useNavigate();
    const selectedCityCoordsRef = useRef(selectedCityCoords)

    useEffect(() => {
        selectedCityCoordsRef.current = selectedCityCoords
    }, [selectedCityCoords])

    useEffect(() => {
        console.log('CityDetails useEffect triggered');
        console.log('selectedCityCoords:', selectedCityCoordsRef.current);
        console.log('selectedCityName:', selectedCityName);
        
        const fetchData = async () => {
            try {
                const { latitude, longitude } = selectedCityCoordsRef.current;
                console.log(`City latitude ${latitude} and longitude ${longitude}`)
                const cityData = await fetchCityData(latitude, longitude);
                console.log('CityData: ', cityData);
                setCityDetails(cityData ? cityData : null);
            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        };

        fetchData();
    }, [selectedCityCoordsRef, selectedCityName]);

    //Hourly forecast for 4 days returns a 'list' array and I need to sort by 'dt_txt' and organize it into a new array. Repeat with 'main.temp' then map through both arrays to have temp above the times.

    return (
        <>
            {/* <div>
                <button onClick={() => navigate('/')}>Back</button>
            </div> */}
            <div style={{justifyContent: 'space-around'}}>
                <h2>{selectedCityName}</h2>
                {selectedCityName ? (
                    <>
                        <p>
                            Current temp: {cityDetails ? <span>{cityDetails.current.temp}</span> : <span>No data available</span>}
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