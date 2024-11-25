import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../src/types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // For hamburger icon

interface HeaderProps {
  tasks: any[];
}

const Header = ({ tasks }: HeaderProps) => {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View className="bg-white w-full border-b border-b-[#dde2e6]">
      {/* Header Container */}
      <View className="flex-row items-center justify-between py-3 px-6">
        {/* Logo and Welcome Message */}
        <View className="flex-row items-center">
          <Image
            source={require('../../../assets/logo.png')}
            className="max-w-20 max-h-20"
            resizeMode="contain"
          />
          <View className="ml-4">
            <Text className="text-xl font-bold text-[#ed6c21]">
              Welcome, {user?.given_name} {user?.family_name}!
            </Text>
            <Text className="text-base text-taskbolt-blue">
              You have {tasks.length} tasks to complete.
            </Text>
          </View>
        </View>

        {/* Hamburger Icon */}
        <TouchableOpacity
          onPress={toggleMenu}
          className="lg:hidden p-2 rounded"
        >
          <Ionicons name={isMenuOpen ? "close" : "menu"} size={24} color="#053e5c" />
        </TouchableOpacity>

        {/* Desktop Links */}
        <View className="hidden lg:flex flex-row space-x-6">
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Text className="text-base text-[#053e5c] font-semibold">Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
            <Text className="text-base text-[#053e5c] font-semibold">My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PaymentInfo')}>
            <Text className="text-base text-[#053e5c] font-semibold">Payment Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
            <Text className="text-base text-[#053e5c] font-semibold">Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
  
        {/* Mobile Menu */}
      {isMenuOpen && (
        <View className="lg:hidden bg-[#f8f9fa]">
          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            className="py-2 px-4 border-b border-b-[#dde2e6]"
          >
            <Text className="text-[#053e5c] font-semibold">Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyAccount')}
            className="py-2 px-4 border-b border-b-[#dde2e6]"
          >
            <Text className="text-[#053e5c] font-semibold">My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PaymentInfo')}
            className="py-2 px-4 border-b border-b-[#dde2e6]"
          >
            <Text className="text-[#053e5c] font-semibold">Payment Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Contact')}
            className="py-2 px-4"
          >
            <Text className="text-[#053e5c] font-semibold">Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
