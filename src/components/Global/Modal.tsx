import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface GenericModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({ visible, onClose, title, children }) => {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-4/5 rounded-lg p-6 w-[90%] max-w-modal">
          {title && <Text className="text-xl font-bold text-center mb-4">{title}</Text>}
          <View className="mb-4">{children}</View>
          <TouchableOpacity
            className="bg-[#ed6c21] p-3 rounded-md"
            onPress={onClose}
          >
            <Text className="text-white text-center font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;
