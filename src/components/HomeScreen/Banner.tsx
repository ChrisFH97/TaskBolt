import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface OrientationBannerProps {
  title: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
}

const OrientationBanner = ({
  title,
  description,
  buttonLabel,
  onPress,
}: OrientationBannerProps) => {
  return (
    <View className="bg-[#daebdb] p-10 rounded-lg mb-4">
      <Text className="text-4xl font-bold text-[#053e5c] mb-4 text-center">
        {title}
      </Text>
      <Text className="text-[#053e5c] text-base font-bold mb-4 text-center max-w-2xl mx-auto">
        {description}
      </Text>
      <TouchableOpacity className="bg-[#ed6c21] p-3 rounded-lg" onPress={onPress}>
        <Text className="text-white text-center font-semibold">
          {buttonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrientationBanner;
