import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Amplify } from 'aws-amplify';
import { signUp, signIn, signOut, confirmSignUp, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

interface AuthContextProps {
  user: any;
  signUp: (username: string, password: string, email: string, forename: string, surname: string, number: string) => Promise<void>;
  confirmSignUp: (username: string, code: string) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user authentication state from async-storage
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Sign up function
  const signUpUser = async (username: string, password: string, email: string, forename: string, surname: string, number: string) => {
    await signUp({
      username,
      password,
      options: {
        userAttributes: { email, given_name: forename, family_name: surname, phone_number: number, 'custom:Type': 'User' ,
         }
      }
    });
  };

  // Confirm sign up function
  const confirmSignUpUser = async (username: string, code: string) => {
    await confirmSignUp({ username, confirmationCode: code });
  };

  // Sign in function
  const signInUser = async (username: string, password: string) => {
    await signIn({ username, password });

    let user = await getCurrentUser();
    let attributes = await fetchUserAttributes();

    user = {
      ...user,
      ...attributes,
    };
    
    setUser(user);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  // Sign out function
  const signOutUser = async () => {
    await signOut();
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp: signUpUser,
        confirmSignUp: confirmSignUpUser,
        signIn: signInUser,
        signOut: signOutUser,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
