import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import MovieManagement from "../pages/MovieManagement/MovieManagement";
import AdminGuard from "../guards/AdminGuard";
import Login from "../pages/Login/Login";
import UserManagement from "../pages/UserManagement/UserManagement";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movie-detail",
          element: <MovieDetail />,
        },
        {
          path: "/login",
          element: <Login />
        },
      ],
    },
    {
      path: "/admin",
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
  ]);

  return routing;
}
