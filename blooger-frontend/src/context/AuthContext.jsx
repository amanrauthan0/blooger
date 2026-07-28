import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [accessToken, setAccessToken] = useState(null);
    const [loading,setLoading]=useState(true);
    async function logout(){
        try{
            console.log("hello")
            await fetch("http://localhost:3000/api/auth/logout",{
                method:"GET",
                credentials:"include"
            });
            setUser(null);
            setAccessToken(null);
            
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