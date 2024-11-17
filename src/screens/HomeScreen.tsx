import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import tw from 'twrnc';

const HomeScreen = () => {
  const { signOut, user } = useAuth();

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-3xl font-bold mb-4`}>Welcome, {user?.username || 'User'}!</Text>
      <Text style={tw`text-lg mb-6`}>You are now logged in.</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default HomeScreen;
