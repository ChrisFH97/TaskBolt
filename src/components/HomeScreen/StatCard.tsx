import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: keyof typeof Ionicons.glyphMap; // Icon name from Ionicons
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <View className="bg-stat-card-background shadow-lg rounded-lg p-4 flex-row items-center justify-between">
      <View>
        <Text className="text-sm font-semibold text-[#ed6c21]">{title}</Text>
        <Text className="text-xl text-white font-bold mt-1">{value}</Text>
      </View>
      <Ionicons name={icon} size={32} color="#ed6c21" />
    </View>
  );
};

export default StatCard;
