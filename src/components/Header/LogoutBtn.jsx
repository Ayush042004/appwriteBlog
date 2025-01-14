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
        <button className="py-2 text-white duration-200 hover:bg-blue-100 hover:text-black rounded-full shadow-md"
        onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn


