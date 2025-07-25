import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";

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

    // creating a function for login 
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    // forget password function

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };
    const authInfo = {
        createNewUser,
        user,
        setUser,
        loading,
        setLoading,
        updateUser,
        googleSignIn,
        logOut,
        signInUser,
        forgetPassword,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;