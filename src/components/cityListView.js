import { fetchCityData } from "../api/fetchCityData";
import React, { useEffect, useState } from 'react';

const cities = ['Austin', 'San Francisco', 'North Carolina', 'New Jersey'];

function CityList() {
    // return (
    //     <div>
    //         {cities.map(city => <div>{city}</div>)}
    //     </div>
    // )

    // use for dynamic city list
    const [cityNames, setCityNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const promises = cities.map(city => fetchCityData(city));
            const resolvedCityNames = await Promise.all(promises);
            setCityNames(resolvedCityNames.filter(name => name !== null));
        };

        fetchData();
    }, []);

    return (
        <div>
            {cityNames.map(cityName => (
                <div key={cityName}>{cityName}</div>
            ))}
        </div>
    )
}

export default CityList;    