import {
  createBrowserRouter,
} from "react-router-dom";
import HomaPage from "../pages/HomaPage";
import ErrorPage from "../pages/ErrorPage";
import Movies from "../pages/Movies";
import PrivateRoute from "./PrivateRoute";
import AddMovie from "../components/AddMovie";
import Favourites from "../components/Favourites";
import AuthPage from "../pages/AuthPage";
import Login from "../components/Login";
import Register from "../components/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element:<HomaPage></HomaPage>
  },
  {
    path: "/movies",
    element:<Movies></Movies>,
    children:[
      {
        path:"add-movie",
        element:<PrivateRoute><AddMovie></AddMovie></PrivateRoute>
      },
      {
        path:"favorites",
        element:<PrivateRoute><Favourites></Favourites></PrivateRoute>
      }
    ]
  },
  {
    path:"auth",
    element:<AuthPage></AuthPage>,
    children:[
      {
        path:"login",
        element:<Login></Login>
      },
      {
        path:"register",
        element:<Register></Register>
      }
    ]
  },
  
  {
    path:"*",
    element:<ErrorPage></ErrorPage>
  }
]);



export default router;