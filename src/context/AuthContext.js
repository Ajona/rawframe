import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, usersAPI, setTokens, clearTokens, getToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on page load
  useEffect(() => {
    const restoreSession = async () => {
      const token = getToken();
      if (!token) { setLoading(false); return; }
      try {
        const { data } = await authAPI.getMe();
        setUser(data.user);
      } catch (_) {
        clearTokens();
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login(email, password);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      return { ok: false, error: err.response?.data?.error || 'Sign in failed.' };
    }
  };

  const loginWithGoogle = async (idToken, plan = 'starter', fields = []) => {
    try {
      const { data } = await authAPI.loginWithGoogle(idToken, plan, fields);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      return { ok: true, user: data.user, isNew: data.isNew };
    } catch (err) {
      return { ok: false, error: err.response?.data?.error || 'Google sign-in failed.' };
    }
  };

  const signup = async (name, email, password, plan = 'starter', fields = []) => {
    try {
      const { data } = await authAPI.signup(name, email, password, plan, fields);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      const message = serverErrors
        ? serverErrors.map(e => e.msg).join(', ')
        : err.response?.data?.error || 'Sign up failed.';
      return { ok: false, error: message };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('rawframe_refresh');
      await authAPI.logout(refreshToken);
    } catch (_) {}
    clearTokens();
    setUser(null);
  };

  const updatePlan = (plan) => setUser(u => ({ ...u, plan }));

  const addPaymentMethod = async (method) => {
    try {
      const { data } = await usersAPI.addPaymentMethod(method);
      setUser(u => ({ ...u, paymentMethods: data.paymentMethods }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.error || 'Failed to add method.' };
    }
  };

  const removePaymentMethod = async (id) => {
    try {
      const { data } = await usersAPI.removePaymentMethod(id);
      setUser(u => ({ ...u, paymentMethods: data.paymentMethods }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.error || 'Failed to remove method.' };
    }
  };

  const setPrimaryMethod = async (id) => {
    try {
      const { data } = await usersAPI.setPrimaryMethod(id);
      setUser(u => ({ ...u, paymentMethods: data.paymentMethods }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.error || 'Failed to update method.' };
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { data } = await usersAPI.updateProfile(updates);
      setUser(u => ({ ...u, ...data.user }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.error || 'Profile update failed.' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, loginWithGoogle, signup, logout,
      updatePlan, updateProfile,
      addPaymentMethod, removePaymentMethod, setPrimaryMethod,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);