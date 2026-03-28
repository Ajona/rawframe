import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id:1, name:'Jane Doe',   email:'jane@rawframe.io',  role:'creator', plan:'pro',     initials:'JD',
    paymentMethods:[ { id:'pm1', type:'mpesa',      label:'M-Pesa',      detail:'+254 712 345 678', icon:'🟢', primary:true  },
                     { id:'pm2', type:'visa',        label:'Visa',        detail:'**** 4242',        icon:'💳', primary:false } ] },
  { id:2, name:'Admin User', email:'admin@rawframe.io', role:'admin',   plan:'studio',  initials:'AU', paymentMethods:[] },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email);
    if (found) { setUser({ ...found }); return { ok:true, user:found }; }
    return { ok:false, error:'Invalid email or password' };
  };

  const loginWithGoogle = (googleProfile) => {
    const newUser = {
      id: Date.now(), name: googleProfile.name, email: googleProfile.email,
      role:'creator', plan:'starter', initials: googleProfile.name.slice(0,2).toUpperCase(),
      avatar: googleProfile.picture || null, paymentMethods:[],
    };
    setUser(newUser);
    return { ok:true, user:newUser, isNew:true };
  };

  const signup = (name, email, password, plan='starter') => {
    const newUser = {
      id:Date.now(), name, email, role:'creator', plan,
      initials:name.slice(0,2).toUpperCase(), paymentMethods:[],
    };
    setUser(newUser);
    return { ok:true, user:newUser };
  };

  const updatePlan = (plan) => setUser(u => ({ ...u, plan }));

  const addPaymentMethod = (method) => {
    setUser(u => ({
      ...u,
      paymentMethods: method.primary
        ? [method, ...(u.paymentMethods||[]).map(m => ({ ...m, primary:false }))]
        : [...(u.paymentMethods||[]), method],
    }));
  };

  const removePaymentMethod = (id) =>
    setUser(u => ({ ...u, paymentMethods:(u.paymentMethods||[]).filter(m => m.id!==id) }));

  const setPrimaryMethod = (id) =>
    setUser(u => ({ ...u, paymentMethods:(u.paymentMethods||[]).map(m => ({ ...m, primary:m.id===id })) }));

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, updatePlan, addPaymentMethod, removePaymentMethod, setPrimaryMethod, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);