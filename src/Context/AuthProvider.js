import React,{useState,useEffect,useContext} from 'react'
import {auth} from '../firebase';
export const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState();
    const [loading,setLoading]=useState(true);
    function signUp(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function logIn(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logOut(){
        return auth.signOut();
    }
    useEffect(()=>{
        //this function will function whne their is a change in the user database of the app
        //that means it will function when a user signin,signUp or signOut
        //it is like tracker that we have applied 
        //here we are changing the state of the app and hence re-render will be called
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })

        return ()=>{
            unsubscribe();
        }
    },[]);

    const value={
        currentUser,
        logIn,
        signUp,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {/* if loading is false then only children will be rendered and provide with the output */}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
