import React from 'react';
import CityList from './components/cityListView';
import CityDetails from './components/cityDetailsView';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        element: <CityList />,
        path: '/',
    },
    {
        element: <CityDetails />,
        path: '/:cityName',
    }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
