
import { Outlet } from 'react-router-dom';


const AuthPage = () => {
    return (
        <div>
            
            <h1>This is auth page </h1>
            <Outlet></Outlet>
            
        </div>
    );
};

export default AuthPage;