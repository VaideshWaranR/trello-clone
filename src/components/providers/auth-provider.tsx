'use client';

import { User } from 'firebase/auth';
import { createContext, useEffect, useState, ReactNode, useCallback } from 'react';

// Mock User type - can be expanded
export interface MockUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in local storage
    try {
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    if (!email || !pass) {
        throw new Error("Email and password are required.");
    }
    // In a real app, you'd validate password. Here, we'll just log in.
    const mockUser: MockUser = { uid: `mock_${Date.now()}`, email };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const signup = useCallback(async (email: string, pass: string) => {
     if (!email || !pass) {
        throw new Error("Email and password are required.");
    }
    // In a real app, you'd check if user exists. Here we just create one.
    const mockUser: MockUser = { uid: `mock_${Date.now()}`, email };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('mockUser');
    setUser(null);
  }, []);

  const value = { user, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
