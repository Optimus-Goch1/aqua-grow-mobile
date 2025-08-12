import React, { createContext, useEffect, useState } from 'react';
import { storeToken, removeToken, getToken } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });
    const [loading, setLoading] = useState(true); // Tracks loading while retrieving token

    useEffect(() => {
        const loadToken = async () => {
            const token = await getToken();
            if (token) {
                setAuth({ token, user: null }); // or retrieve user too if stored
            }
            setLoading(false); // done loading
        };
        loadToken();
    }, []);

    const signIn = async (token, user) => {
        await storeToken(token);
        setAuth({ token, user });
    };

    const signOut = async () => {
        await removeToken();
        setAuth({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ ...auth, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};