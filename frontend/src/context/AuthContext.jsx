import { createContext, useState, useEffect } from 'react';
import api, { loginUser, signupUser, updateProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // You might want to add fetchMe to api.js later, but for now we'll keep it simple
          // Since the interceptor handles the token, this still works.
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (error) {
          console.error('Session expired or invalid token');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      setUser(data);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      const data = await signupUser(userData);
      localStorage.setItem('token', data.token);
      setUser(data);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };

  const updateProfileData = async (profileData) => {
    try {
      const data = await updateProfile(profileData);
      setUser(data);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfileData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
