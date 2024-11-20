import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    tasks: any[];
}

const Header = ({ tasks }: HeaderProps) => {

    const { signOut, user } = useAuth();

    return (
        <View className=" flex-row items-center justify-between mb-2 py-3 px-6 xl:px-3 w-full mx-auto border-b border-b-[#dde2e6]">
            <View className="flex-row items-center">
                <Image source={require('../../../assets/logo.png')} className="max-w-20 max-h-20" resizeMode="contain" />
                <View className="ml-4">
                <Text className="text-xl font-bold text-[#ed6c21]">
                    Welcome, {user?.given_name} {user?.family_name}!
                </Text>
                <Text className="text-base text-taskbolt-blue">You have {tasks.length} tasks to complete.</Text>
                </View>
            </View>
            <TouchableOpacity className="bg-[#ed6c21] p-3 rounded-lg" onPress={signOut}>
                <Text className="text-white text-lg font-semibold">Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

  export default Header;