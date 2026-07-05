import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        setLogin(!!user);
    }, [user]);

    const value = {
        user,
        setUser,
        isLogin,
        setLogin,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;