
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => (
    <footer className=" bg-gray-300 text-orange-600  py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <span className="text-lg font-semibold tracking-wide">
                Watchly
            </span>
            <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                   
                    aria-label="Twitter"
                >
                    <FaTwitter size={20} />
                </a>
                <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    
                    aria-label="Facebook"
                >
                    <FaFacebookF size={20} />
                </a>
                <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    
                    aria-label="Instagram"
                >
                    <FaInstagram size={20} />
                </a>
            </div>
            <span className="text-sm mt-4 md:mt-0 text-center">
                &copy; 2025 Watchly. All rights reserved.
            </span> 
        </div>
    </footer>
);

export default Footer;