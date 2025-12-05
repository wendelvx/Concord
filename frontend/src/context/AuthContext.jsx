import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('discord_user');
        const token = localStorage.getItem('discord_token');

        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/api/auth/login', { email, password });
        
        const { token, user } = response.data;
        localStorage.setItem('discord_token', token);
        localStorage.setItem('discord_user', JSON.stringify(user));
        
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('discord_token');
        localStorage.removeItem('discord_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};