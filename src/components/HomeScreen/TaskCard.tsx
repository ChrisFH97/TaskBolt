import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface Task {
  title: string;
  dueDate: Date;
  status: string;
  location: string;
}

const TaskCard = ({ task }: { task: Task }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500';
      case 'In Progress':
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };

  const dueInDays = Math.ceil((task.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  

  return (
    <View style={tw`bg-white shadow-lg p-4 mb-4 rounded-xl`}>
      <Text style={tw`text-lg font-bold text-[#ed6c21]`}>{task.title}</Text>
      <Text style={tw`text-sm text-gray-500`}>Due in {dueInDays} Days</Text>
      <Text style={tw`text-sm text-blue-700`}>Location: {task.location}</Text>
      <Text style={tw`text-sm ${getStatusStyle(task.status)} font-semibold mt-2`}>{task.status}</Text>
    </View>
  );
};

export default TaskCard;
