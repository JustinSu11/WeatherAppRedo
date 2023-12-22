import React from 'react';
import CityList from './components/cityListView';
import CityDetails from './components/cityDetailsView';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        element: <CityList />,
        path: '/',
        children: [
            {
                path: '/city/:cityName',
                element: <CityDetails />
            }
        ]
    }
])

function App() {
  return (
    <RouterProvider router={router} />
        // {/* <Switch>
        //     <Route path='/' exact component={CityList} />
        //     <Route path='/city/:cityName' component={CityDetails} />
        // </Switch> */}
  );
}

export default App;
