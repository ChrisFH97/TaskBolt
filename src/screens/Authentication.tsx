import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen() {
  const { signUp, confirmSignUp, signIn } = useAuth();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [number, setNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSignUp = async () => {
    try {
      let formattedNumber = number;
      if (!formattedNumber.startsWith('+')) {
        formattedNumber = `+44${number}`;
      }
      await signUp(username, password, email, forename, surname, formattedNumber);
      setIsConfirming(true);
      Alert.alert('Success', 'Account created. Please check your email for the confirmation code.');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp(username, confirmationCode);
      Alert.alert('Success', 'Account confirmed successfully!');
      setIsConfirming(false);
    } catch (error) {
      Alert.alert('Confirmation Error', error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(username, password);
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Log In Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <View className="flex-1 justify-center items-center bg-[#053e5c]">
        <View className="w-full max-w-lg">
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} keyboardShouldPersistTaps="handled">
            <View className="w-full max-w-md bg-[#053e5c] p-6 rounded-lg">
              {/* Logo */}
              <Image
                source={require('../../assets/logo.png')}
                className="w-24 h-24 mb-6 self-center"
                resizeMode="contain"
              />

              {!isConfirming ? (
                <>
                  <Text className="text-3xl font-bold text-[#ed6c21] text-center mb-6">
                    {isSignUpMode ? 'Create Your Account' : 'Log In'}
                  </Text>

                  {isSignUpMode && (
                    <>
                      {/* First Name and Last Name */}
                      <View className="flex-row justify-between w-full mb-4">
                        <TextInput
                          placeholder="First Name"
                          placeholderTextColor="#A0AEC0"
                          value={forename}
                          onChangeText={setForename}
                          className="flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900 mr-2"
                        />
                        <TextInput
                          placeholder="Last Name"
                          placeholderTextColor="#A0AEC0"
                          value={surname}
                          onChangeText={setSurname}
                          className="flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900"
                        />
                      </View>

                      {/* Phone Number and Email */}
                      <View className="flex-row justify-between w-full mb-4">
                        <TextInput
                          placeholder="Phone (+447911123456)"
                          placeholderTextColor="#A0AEC0"
                          value={number}
                          keyboardType="phone-pad"
                          onChangeText={setNumber}
                          className="flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900 mr-2"
                        />
                        <TextInput
                          placeholder="Email"
                          placeholderTextColor="#A0AEC0"
                          value={email}
                          onChangeText={setEmail}
                          className="flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900"
                        />
                      </View>
                    </>
                  )}

                  {/* Username */}
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="#A0AEC0"
                    value={username}
                    onChangeText={setUsername}
                    className="border border-blue-200 p-3 mb-4 rounded-lg bg-white text-blue-900 w-full"
                  />

                  {/* Password */}
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A0AEC0"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    className="border border-blue-200 p-3 mb-6 rounded-lg bg-white text-blue-900 w-full"
                  />

                  {/* Sign Up / Log In Button */}
                  <TouchableOpacity
                    className="bg-[#ed6c21] p-4 rounded-lg items-center mb-4 w-full"
                    onPress={isSignUpMode ? handleSignUp : handleSignIn}
                  >
                    <Text className="text-white text-lg font-semibold">
                      {isSignUpMode ? 'Sign Up' : 'Log In'}
                    </Text>
                  </TouchableOpacity>

                  {/* Toggle Button */}
                  <TouchableOpacity onPress={() => setIsSignUpMode(!isSignUpMode)}>
                    <Text className="text-blue-300 text-center">
                      {isSignUpMode ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text className="text-3xl font-bold text-[#ed6c21] text-center mb-6">Confirm Your Account</Text>
                  <TextInput
                    placeholder="Enter Confirmation Code"
                    placeholderTextColor="#A0AEC0"
                    value={confirmationCode}
                    onChangeText={setConfirmationCode}
                    className="border border-blue-200 p-3 mb-6 rounded-lg bg-white text-blue-900 w-full"
                  />
                  <TouchableOpacity className="bg-blue-600 p-4 rounded-lg items-center w-full" onPress={handleConfirmSignUp}>
                    <Text className="text-white text-lg font-semibold">Confirm</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
