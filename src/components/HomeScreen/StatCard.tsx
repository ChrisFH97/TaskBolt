import React from 'react';
import { View, Text } from 'react-native';

interface StatCardProps {
  title: string;
  value: number | string;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <View className="bg-stat-card-background shadow-lg rounded-lg p-4">
      <Text className="text-lg font-bold text-[#ed6c21]">{title}</Text>
      <Text className="text-2xl text-white mt-2">{value}</Text>
    </View>
  );
};

export default StatCard;
