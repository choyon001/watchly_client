import { createContext } from "react";

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const user = {
        name: "John Doe",
        email: "john@gmail.com"
    }
    const authInfo = {
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;