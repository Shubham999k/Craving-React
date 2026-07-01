import React from "react";

const AuthContext = React.createContext;

const AuthProvider = (children) => {
    const [user, setUser] = useState(null);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        if (user) {
            //     setLogin(true);
            // } else {
            //     setLogin(false);
            // }
            setIsLogin(!!user)
        }
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
    )
}