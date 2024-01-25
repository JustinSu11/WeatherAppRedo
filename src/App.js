import React from 'react';
// import CityList from './components/cityListView';
// import CityDetails from './components/cityDetailsView';
import WeatherDashboard from './components/weatherDashboard';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// const router = createBrowserRouter([
//     {
//         element: <CityList />,
//         path: '/',
//     },
//     {
//         element: <CityDetails />,
//         path: '/:cityName',
//     }
// ])

function App() {
  return (
    // <RouterProvider router={router} />
    <WeatherDashboard />
  );
}

export default App;
