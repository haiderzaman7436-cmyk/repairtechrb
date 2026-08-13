import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  uid: string;
  email: string;
  displayName: string;
  isAdmin?: boolean;
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated Firebase Auth persistence
    const savedUser = localStorage.getItem('repairtech_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _pass: string) => {
    // Simulated login delay
    await new Promise(r => setTimeout(r, 1000));
    
    // Mock admin logic
    const isMockAdmin = email === 'admin@repairtech.co.za';
    
    const mockUser = { 
      uid: Math.random().toString(36).substr(2, 9), 
      email, 
      displayName: email.split('@')[0],
      isAdmin: isMockAdmin 
    };
    
    setUser(mockUser);
    localStorage.setItem('repairtech_user', JSON.stringify(mockUser));
  };

  const register = async (email: string, _pass: string, name: string) => {
    await new Promise(r => setTimeout(r, 1000));
    const mockUser = { uid: Math.random().toString(36).substr(2, 9), email, displayName: name };
    setUser(mockUser);
    localStorage.setItem('repairtech_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('repairtech_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
