import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Home from '../pages/Home/Home';
import MovieDetail from '../pages/MovieDetail/MovieDetail';

export default function Router() {
  const routing = useRoutes([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/movie-detail',
          element: <MovieDetail />,
        },
      ],
    },
  ]);

  return routing;
}
