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
import MovieDetails from "../components/MovieDetails";
import FeaturedMovies from "../components/FeaturedMovies";
import WhyChooseUs from "../components/WhyChooseUs";
import LatestReleases from "../components/LatestReleases";
import TopContributors from "../components/TopContributors";

function HomeLayout() {
  return (
    <>
      <Slider />
      <FeaturedMovies />
      
      <LatestReleases></LatestReleases>
      <TopContributors></TopContributors>
      <WhyChooseUs></WhyChooseUs>
    </>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "/",
        element:<HomeLayout></HomeLayout>
      },
      
      {
        path: "movies",
        children: [
          {
            path: "", // This matches "/movies"
            element: <Movies></Movies>,
          },
          {
            path: ":id", 
            element: <PrivateRoute><MovieDetails></MovieDetails></PrivateRoute>,
          }
        ]
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
