import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const [accessToken, setAccessToken] = useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        refresh();
    },[]);


    async function refresh(){
        try{
            const res=await fetch("http://localhost:3000/api/auth/refresh-token",{
                method:"GET",
                credentials:"include"
            });
            const data=await res.json();

            setAccessToken(data.accessToken);
            setUser(data.user)
            
        }catch(err){
            console.log(err.message);
        }finally {
            setLoading(false);
        }
    }

    async function logout(){
        try{
            await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{
                method:"GET",
                credentials:"include"
            });
            setUser(null);
            setAccessToken(null);
            setLoading(false);
        }catch(e){
            console.log(e.message);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                accessToken,
                setAccessToken,
                loading,
                setLoading,
                refresh,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}