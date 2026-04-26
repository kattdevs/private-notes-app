import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Check if the user is already logged in when the app loads 
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authAPI.me();
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await authAPI.login(email, password);
        setUser(res.data.user);
        return res;
    };

    const logout = async () => {
        await authAPI.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

//Custom hook - use this in any component to access auth
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error ('useAuth msut be used inside AuthProvider');
    return context;
};