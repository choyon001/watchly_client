import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, updateProfile} from "firebase/auth";

import { createContext, useEffect, useState } from "react";

import {auth} from '../firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
// authcontext 
export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    // seting up the loading state and user state 
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    // creating observer for the user 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
            
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    //  create new user function for registration 

    const createNewUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // creating a update user function 

    const updateUser = (updateInfo)=>{
        return updateProfile(auth.currentUser,updateInfo);
    }

    // creating a user with google sign in 
    const provider = new GoogleAuthProvider();
    const googleSignIn = ()=>{
        return signInWithPopup(auth, provider);
    }


    // creating logout function 

    const logOut = ()=>{
        return signOut(auth);
    }
    const authInfo = {
        createNewUser,
        user,
        setUser,
        loading,
        setLoading,
        updateUser,
        googleSignIn,
        logOut,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;