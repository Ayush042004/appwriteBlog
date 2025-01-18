import React from "react";
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'


function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {  //logout handler using authservise logout then dispatch logout 
        authService.logout().then(() => {
           dispatch(logout())
        })
    }

    return (
        <button className="   w-full max-w-xs py-2 px-4 sm:px-6 lg:py-2 lg:px-8 lg:text-lg text-white duration-200 hover:bg-blue-100 hover:text-black rounded-full shadow-md"
        onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn


