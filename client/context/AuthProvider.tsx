"use client"

import React, { createContext, useState } from 'react';

type AuthContextType = {
  auth: any; 
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

const initialAuthState = {}; 

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: () => {}, // Placeholder function
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
