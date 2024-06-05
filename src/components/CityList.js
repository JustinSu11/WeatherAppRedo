import React from 'react'
import './cityList.css'
import Card from "./shared/Card"

const CityList = ({ cities, onCityClick }) => {
    
    return (
        <div className='vertical-scroll-container'>
            {cities.map((city) => (
                <>
                <div key={city.name} onClick={() => onCityClick(city.latitude, city.longitude)} style={{ cursor: 'pointer', width: '200px', height: '100px'}} className='city-list-navigation'>
                    <Card>
                        <h3 className='city-list-h3'>
                            {city.name}
                        </h3>
                    </Card>
                </div>
                </>
            ))}
        </div>
    )
}

export default CityList    