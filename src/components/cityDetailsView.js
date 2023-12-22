import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState } from 'react';

const cities = ['Austin', 'San Francisco', 'Jacksonville', 'New Jersey'];

function CityDetails() {
    const [cityDetails, setCityDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = cities.map(async city => {
                    const cityData = await fetchCityData(city);
                    return cityData ? cityData.main : null;
                });
                const resolvedCityDetails = await Promise.all(promises);
                setCityDetails(resolvedCityDetails.filter(main => main !== null));
            } catch (error) {
                console.error('Error fetching city data:', error.message)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {console.log(cityDetails)}
            <div>
                <p>
                    High: {cityDetails ? cityDetails.map((data, index) => (
                        <span key={index}>{data.temp_max}</span>
                    )) : (
                        <span>No data available</span>
                    )}
                </p>
            </div>
        </>

    )
}

export default CityDetails;