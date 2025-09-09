import React, { createContext, useEffect, useState } from 'react';
import {
    storeToken, removeToken, getToken,
    storeUser, removeUser, getUser
} from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });
    const [loading, setLoading] = useState(true); // while restoring auth

    useEffect(() => {
        const loadAuth = async () => {
            const token = await getToken();
            const user = await getUser();
            if (token && user) {
                setAuth({ token, user });
            }
            setLoading(false);
        };
        loadAuth();
    }, []);

    const signIn = async (token, user) => {
        await storeToken(token);
        await storeUser(user);
        setAuth({ token, user });
    };

    const signOut = async () => {
        await removeToken();
        await removeUser();
        setAuth({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ ...auth, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};