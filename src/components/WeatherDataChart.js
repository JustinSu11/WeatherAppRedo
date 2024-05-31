import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import React from 'react'
import './components.css'

const WeatherDataChart = ({ data, selectedWeatherAttribute, onChange }) => {
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

    return (
        <div>
            
            {/*recharts*/}
            <div className='weather-data-chart-container'>
                <ResponsiveContainer width="60%" aspect={3}>
                {/*dropdown for filter */}
                <div style={{display: 'flex', justifyContent: 'flex-end' }}>
                    <select value={selectedWeatherAttribute} onChange={onChange}>
                        <option value="temp">Temperature</option>
                        <option value="feels_like">Feels Like</option>
                        <option value="humidity">Humidity</option>
                    </select>
                </div>
                <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis datakey="value"/>
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
                </ResponsiveContainer>
             </div>
        </div>
    )
}

export default WeatherDataChart
