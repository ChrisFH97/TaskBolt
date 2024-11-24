import './src/amplifyconfiguration.json';
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import "./global.css"
import { ScrollView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}