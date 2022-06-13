import { createContext, useState } from "react";
import axios from "axios";
import url from "../helpers/url";

const AuthContext = createContext();


const addUserToSessionStorage = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
}

const removeUserFromSessionStorage = () => {
    sessionStorage.removeItem("user");
}

const getUserFromSessionStorage = () => {
    return JSON.parse(sessionStorage.getItem("user"));
}


function AuthProvider({ children }) {
    const [user, setUser] = useState(getUserFromSessionStorage());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${url}/users/login`, { email, password });
            setUser(response.data);
            addUserToSessionStorage(response.data);
        }
        catch (error) {
            setError(error.response.data);
        }
        setIsLoading(false);
    }

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // await axios.post('/api/logout');
            setUser(null);
            removeUserFromSessionStorage();
        }
        catch (error) {
            // setError(error.response.data);
        }
        setIsLoading(false);
    }

    const register = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${url}/users/register`, { firstName, lastName, email, password });
            setUser(response.data);
        }
        catch (error) {
            setError(error.response.data);
        }
        setIsLoading(false);
    }

    const isAuthenticated = () => {
        return user !== null;
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            error,
            login,
            logout,
            register,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;