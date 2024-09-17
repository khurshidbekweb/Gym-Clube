import { useUserState } from "@/store/user.store";
import FillLoading from "../shared/fill-loading";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "@/firebase";

const AuthProvider = ({children}: {children: ReactNode}) => {

    const {setUser} = useUserState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            user && setUser(user)
            setIsLoading(false)
        })
    },[])

    return isLoading ? <FillLoading/> : <>{children}</> ;
};

export default AuthProvider;