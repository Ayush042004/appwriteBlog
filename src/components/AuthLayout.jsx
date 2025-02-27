import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//this code is for protected route used to manage access control for its children components bases on user authentication status
export default function Protected({children, authentication = true}) { //children prop for nested comp and access it by authentication at true prop
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)


    useEffect(() => {
        if(authentication && authStatus !== authentication){ // is condition me first true ha and second bhi true ha so navigated to login 
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){ // is condition me first false ha and second bhi false 
            navigate("/")
        }
        setLoader(false)
    },[authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1>: <>{children}</>
}