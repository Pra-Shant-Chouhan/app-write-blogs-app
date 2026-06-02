import React, { useEffect, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children, authentication = true }: { children?: ReactNode; authentication?: boolean }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: any) => state.auth.status)

    useEffect(() => {
        console.log(`IN auth layout=>,authStatus->${authStatus}, authentication->${authentication}`)
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    if (loader) return <div>Loading...</div>
    return (
        <>{children}</>
    )
}