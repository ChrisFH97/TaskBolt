import React from 'react';
import { FlatList, View, Text } from 'react-native';
import tw from 'twrnc';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  status: string;
  location: string;
}

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskCard task={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={tw`text-white text-center mt-6`}>No tasks assigned for today.</Text>}
    />
  );
};

export default TaskList;
