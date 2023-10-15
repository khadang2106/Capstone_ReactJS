import React from "react";
import {Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import MovieManagement from "../pages/MovieManagement/MovieManagement";
import AdminGuard from "../guards/AdminGuard";
import Login from "../pages/Login/Login";
import TicketBooking from '../pages/TicketBooking/TicketBooking';
import AuthGuard from '../guards/AuthGuard';
import NoAuthGuard from '../guards/NoAuthGuard';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import UserManagement from "../pages/UserManagement/UserManagement";

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
          path: '/movie-detail/:movieId',
          element: <MovieDetail />,
        },
        {
          path: '/ticket-booking/:id',
          element: (
            <AuthGuard>
              <TicketBooking />
            </AuthGuard>
          ),
        },
        {
          path: '/login',
          element: (
            <NoAuthGuard>
              <Login />
            </NoAuthGuard>
          ),
        },
        {
          path: '/profile',
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          ),
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/admin',
      element: (
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      ),
      children: [
        {
          path: "/admin",
          element: <Navigate to="/admin/user-management" />,
        },
        {
          path: "/admin/user-management",
          element: <UserManagement />
        },
        {
          path: "/admin/movie-management",
          element: <MovieManagement />
        }
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return routing;
}
