import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../features/authSlice';

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const LogoutHandler = async () => {
        try{
            await authService.logout()
            dispatch(logout())
        }catch(error){
            console.error("On Click logout Btn",error)
        }
    }

    return (
        <button onClick={LogoutHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={LogoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn