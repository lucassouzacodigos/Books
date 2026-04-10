import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";




export default function ProtectedRouter({roles, children}){
    const token = localStorage.getItem("token")
    const router = useNavigate()

    console.log(roles, children, jwtDecode(token))

    const user = useMemo(() => {
        if (!token) return null;
        console.log(jwtDecode(token))
        try{
            return jwtDecode(token)
        }catch(err){
            console.log(err)
        }

    }, [token])

    useEffect(() => {

        if (!user || user.exp * 1000 < Date.now()){
            router("/login")
        }

        if(roles && !roles.includes(user.typeUser)){
            router("/")
        }                                                                                                        

    }, [user])
    return children
}

