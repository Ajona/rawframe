import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Two mock users: a creator and an admin
const MOCK_USERS = [
  { id:1, name:'Jane Doe',  email:'jane@rawframe.io',  role:'creator', plan:'pro',   initials:'JD' },
  { id:2, name:'Admin User',email:'admin@rawframe.io', role:'admin',   plan:'studio', initials:'AU' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email);
    if (found) { setUser(found); return { ok: true, user: found }; }
    return { ok: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password, plan = 'starter') => {
    const newUser = { id: Date.now(), name, email, role:'creator', plan, initials: name.slice(0,2).toUpperCase() };
    setUser(newUser);
    return { ok: true, user: newUser };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);