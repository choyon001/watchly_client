import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Movies from "../pages/Movies";
import PrivateRoute from "./PrivateRoute";
import AddMovie from "../components/AddMovie";
import Favourites from "../components/Favourites";
import AuthPage from "../pages/AuthPage";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "./../pages/About";
import Slider from "../components/Slider";
import ForgetPassword from "../components/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "/",
        element:<Slider></Slider>
      },
      {
        path: "movies",
        element: <Movies></Movies>,
      },
      {
        path: "add-movie",
        element: (
          <PrivateRoute>
            <AddMovie></AddMovie>
          </PrivateRoute>
        ),
      },
      {
        path: "favourites",
        element: (
          <PrivateRoute>
            <Favourites></Favourites>
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About></About>,
      },

      {
    path: "/auth",
    element: <AuthPage></AuthPage>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
    path:"forgot-password",
    element:<ForgetPassword></ForgetPassword>
  },
    ],
  },
    ],
  },
  
  

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
