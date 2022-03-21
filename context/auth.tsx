import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { me } from 'services/users';

import { useRouter } from 'next/router';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const router = useRouter();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function loadUserFromCookies() {

            const token = Cookies.get('token');
            let user: any = {};

            if (token) {                
                user = await me();
                if (user) { setUser(user)};
            }

            setLoading(false)
            if (user.error || !token) {
                router.push('/users/login', null, { shallow: true });                
                return;
            }            
        }
        loadUserFromCookies();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth: any = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {    
    const router = useRouter();
    const noAuthPage = ['/users/login', 'users/register'];

    const { isAuthenticated, loading } = useAuth();
    if (typeof window !== undefined) {        
        const currentPageNoAuth = noAuthPage.includes(router.pathname); 
        if (loading || (!isAuthenticated && !currentPageNoAuth)){
          <>Loading...</>
        }
    }
    return children;
};