import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";


const HomePage = () => {
    return (
        <div >
            {/* a navbar seciton  */}
            <Navbar  ></Navbar>
            <div className=" h-5 md:h-20"></div>
            
            
            {/* slider section  */}
            {/* <Slider className="w-10/12 mx-auto"></Slider> */}

            {/* main section  */}
            
            <Outlet></Outlet>
            {/* footer section  */}
            <Footer className=""></Footer>

        </div>
    );
};

export default HomePage;