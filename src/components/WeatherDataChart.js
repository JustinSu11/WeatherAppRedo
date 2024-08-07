import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from 'recharts'
import React, { useState } from 'react'
import './weatherDataChart.css'

const WeatherDataChart = ({ data }) => {
    const [selectedWeatherAttribute, setSelectedWeatherAttribute] = useState('temp')

    const filteredWeatherData = data.hourly.slice(0, 12)

    function CustomTooltip({ active, payload, label }) {
        if (active && payload && payload.length) {
            const { value, unit } = payload[0].payload
            return (
                <div className="custom-tooltip-for-WeatherDataChart">
                    <p className="WeatherDataChart-value">{`${value} ${unit}`}</p>
                    <p className="WeatherDataChart-label">{label}</p>
                </div>
            )
        }
        return null
    }

        //Transform data to recharts format
        const transformedData = filteredWeatherData.map(dataPoint => ({
            name: new Date(dataPoint.dt * 1000).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit', hour12: true}),
            value: dataPoint[selectedWeatherAttribute],
            unit: (selectedWeatherAttribute === 'temp' || selectedWeatherAttribute === 'feels_like' ? '°' : selectedWeatherAttribute === 'humidity' ? '%' : null),
        }))
    
        //takes in the selected filter value and sets the weather attribute to the selected value
        const handleFilterChange = (event) => {
            setSelectedWeatherAttribute(event.target.value)
        }

    return (
        <div>
            
            {/*recharts*/}
            <div className='weather-data-chart-container'>
                <ResponsiveContainer width="60%" aspect={2.5}>
                    {/*dropdown for filter */}
                    <div style={{display: 'flex', justifyContent: 'flex-end' }}>
                        <select value={selectedWeatherAttribute} onChange={handleFilterChange}>
                            <option value="temp">Temperature</option>
                            <option value="feels_like">Feels Like</option>
                            <option value="humidity">Humidity</option>
                        </select>
                    </div>
                    <AreaChart data={transformedData}>
                        <defs>
                            <linearGradient id="heat" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="red" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="yellow" stopOpacity={0.3}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#heat)" /> 
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis datakey="value"/>
                        <Tooltip content={<CustomTooltip />} />
                        <Brush dataKey="name" height={5} stroke="#8884d8" endIndex={5} />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </div>
    )
}

export default WeatherDataChart
