import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import tw from 'twrnc';

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

  // Handle sign-up process
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

  // Handle confirmation process
  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp(username, confirmationCode);
      Alert.alert('Success', 'Account confirmed successfully!');
      setIsConfirming(false);
    } catch (error) {
      Alert.alert('Confirmation Error', error.message);
    }
  };

  // Handle log in process
  const handleSignIn = async () => {
    try {
      await signIn(username, password);
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Log In Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center bg-[#053e5c]`}>
        <View style={tw`w-full max-w-lg`}>
          <ScrollView contentContainerStyle={tw`flex-1 justify-center items-center`} keyboardShouldPersistTaps="handled">
            <View style={tw`w-full max-w-md bg-[#053e5c] p-6 rounded-lg`}>
              {/* Logo */}
              <Image
                source={require('../../assets/logo.png')}
                style={tw`w-24 h-24 mb-6 self-center`}
                resizeMode="contain"
              />

              {!isConfirming ? (
                <>
                  <Text style={tw`text-3xl font-bold text-[#ed6c21] text-center mb-6`}>
                    {isSignUpMode ? 'Create Your Account' : 'Log In'}
                  </Text>

                  {isSignUpMode && (
                    <>
                      {/* First Name and Last Name */}
                      <View style={tw`flex-row justify-between w-full mb-4`}>
                        <TextInput
                          placeholder="First Name"
                          placeholderTextColor="#A0AEC0"
                          value={forename}
                          onChangeText={setForename}
                          style={tw`flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900 mr-2`}
                        />
                        <TextInput
                          placeholder="Last Name"
                          placeholderTextColor="#A0AEC0"
                          value={surname}
                          onChangeText={setSurname}
                          style={tw`flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900`}
                        />
                      </View>

                      {/* Phone Number and Email */}
                      <View style={tw`flex-row justify-between w-full mb-4`}>
                        <TextInput
                          placeholder="Phone (+447911123456)"
                          placeholderTextColor="#A0AEC0"
                          value={number}
                          keyboardType="phone-pad"
                          onChangeText={setNumber}
                          style={tw`flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900 mr-2`}
                        />
                        <TextInput
                          placeholder="Email"
                          placeholderTextColor="#A0AEC0"
                          value={email}
                          onChangeText={setEmail}
                          style={tw`flex-1 border border-blue-200 p-3 rounded-lg bg-white text-blue-900`}
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
                    style={tw`border border-blue-200 p-3 mb-4 rounded-lg bg-white text-blue-900 w-full`}
                  />

                  {/* Password */}
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A0AEC0"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    style={tw`border border-blue-200 p-3 mb-6 rounded-lg bg-white text-blue-900 w-full`}
                  />

                  {/* Sign Up / Log In Button */}
                  <TouchableOpacity
                    style={tw`bg-[#ed6c21] p-4 rounded-lg items-center mb-4 w-full`}
                    onPress={isSignUpMode ? handleSignUp : handleSignIn}
                  >
                    <Text style={tw`text-white text-lg font-semibold`}>
                      {isSignUpMode ? 'Sign Up' : 'Log In'}
                    </Text>
                  </TouchableOpacity>

                  {/* Toggle Button */}
                  <TouchableOpacity onPress={() => setIsSignUpMode(!isSignUpMode)}>
                    <Text style={tw`text-blue-300 text-center`}>
                      {isSignUpMode ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={tw`text-3xl font-bold text-[#ed6c21] text-center mb-6`}>Confirm Your Account</Text>
                  <TextInput
                    placeholder="Enter Confirmation Code"
                    placeholderTextColor="#A0AEC0"
                    value={confirmationCode}
                    onChangeText={setConfirmationCode}
                    style={tw`border border-blue-200 p-3 mb-6 rounded-lg bg-white text-blue-900 w-full`}
                  />
                  <TouchableOpacity style={tw`bg-blue-600 p-4 rounded-lg items-center w-full`} onPress={handleConfirmSignUp}>
                    <Text style={tw`text-white text-lg font-semibold`}>Confirm</Text>
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
