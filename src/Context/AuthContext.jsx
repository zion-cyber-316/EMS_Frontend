
import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const userContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isManualLogin, setIsManualLogin] = useState(false);

  const navigate = useNavigate();


  const serverLink = "https://ems-backend-zbz9.onrender.com"
   
  

  useEffect(() => {
    // Skip verification if user was just manually logged in
    if (isManualLogin) {
      setIsManualLogin(false);
      return;
    }

    const userVerify = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }

      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);   // <-- Always stop loading
      }
    };

    userVerify();
  }, [isManualLogin]);

  const login = (userData) => {
    console.log('AuthContext - login called with:', userData)
    setIsManualLogin(true);
    setUser(userData);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  

  return (
    <userContext.Provider value={{ user, login, logout, loading,serverLink }}>
      {children}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);

export default AuthContext;






