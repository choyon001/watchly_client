import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";


const HomePage = () => {
    return (
        <div >
            {/* a navbar seciton  */}
            <Navbar className="w-11/12 mx-auto"></Navbar>
            {/* main section  */}
            <Outlet></Outlet>
            {/* footer section  */}
            <Footer className=""></Footer>

        </div>
    );
};

export default HomePage;