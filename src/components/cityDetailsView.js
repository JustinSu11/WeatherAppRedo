import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import Card from "./cardComponent";
import { WeatherDataChart } from "./WeatherDataChart";

const CityDetails = ({ selectedCityCoords, selectedCityName }) => {
    const [cityDetails, setCityDetails] = useState(null);
    const [weatherDataForChart, setWeatherDataForChart] = useState([]);
    // const { cityName } = useParams();
    // const navigate = useNavigate();
    const selectedCityCoordsRef = useRef(selectedCityCoords);

    useEffect(() => {
        selectedCityCoordsRef.current = selectedCityCoords
    }, [selectedCityCoords])

    useEffect(() => {
        const fetchData = async () => {
            try {
                //takes selected city which is set by handleCityClick() retrieves weather data for city
                const { latitude, longitude } = selectedCityCoordsRef.current;
                console.log(`City latitude ${latitude} and longitude ${longitude}`)
                const cityData = await fetchCityData(latitude, longitude);
                console.log('CityData: ', cityData);
                setCityDetails(cityData ? cityData : null);

                // Filter and set Weather Data for chart
                const filteredWeatherData = cityData.hourly.slice(0, 24);
                setWeatherDataForChart(filteredWeatherData);

                setWeatherDataForChart((prevData) => {
                    console.log('Weather data for chart:', prevData);
                    return prevData;
                });
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
                <Card>
                    <h2 className='city-details-h2'>{selectedCityName}</h2>
                    <WeatherDataChart data={weatherDataForChart}/>
                    <Card>
                        {selectedCityName ? (
                            <>
                                <p>
                                    Current temp: {cityDetails ? <span>{cityDetails.current.temp}°</span> : <span>No data available</span>}
                                </p>
                            </>
                        ) : (
                            <p>Select a city to view the weather</p>
                        )}
                    </Card>
                </Card>
            </div>
        </>

    )
}

export default CityDetails;