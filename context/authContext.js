import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });

    const signIn = (token, user) => setAuth({ token, user });
    const signOut = () => setAuth({ token: null, user: null });

    return (
        <AuthContext.Provider value={{ ...auth, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};