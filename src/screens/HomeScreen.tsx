import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, useWindowDimensions } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import tw from 'twrnc';
import { format } from 'date-fns';
import MapComponent from '../components/HomeScreen/MapComponent';
import { apiKey, mapId } from '../../Constants';

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  status: 'Completed' | 'Pending' | 'In Progress';
  location: string;
}

const HomeScreen = () => {
  const { signOut, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks: Task[] = [
      {
        id: '1',
        title: 'Install TV Mount',
        dueDate: new Date(),
        status: 'In Progress',
        location: '4 Gala St, Glasgow, Scotland',
      },
      {
        id: '2',
        title: 'Home Theater Setup',
        dueDate: new Date(),
        status: 'Pending',
        location: 'Odeon Luxe, Glasgow, Scotland',
      },
      {
        id: '3',
        title: 'Security Camera Installation',
        dueDate: new Date(),
        status: 'Completed',
        location: '123 Maple St, Glasgow, Scotland',
      },
    ];
    setTasks(fetchedTasks);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity onPress={() => setSelectedTask(item)}>
      <View style={tw`bg-white shadow-lg p-4 mb-4 rounded-xl mr-2`}>
        <Text style={tw`text-lg font-bold text-[#ed6c21]`}>{item.title}</Text>
        <Text style={tw`text-sm text-gray-500`}>Due: {format(item.dueDate, 'dd/MM/yyyy')}</Text>
        <Text style={tw`text-sm text-blue-700`}>Location: {item.location}</Text>
        <View style={tw`mt-2`}>
          <Text style={tw`text-sm ${getStatusStyle(item.status)} font-semibold`}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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

  const tasksNotCompleted = tasks.filter((task) => task.status !== 'Completed').length;

  return (
    <ScrollView contentContainerStyle={tw`flex-1 bg-[#053e5c] p-4`}>
      {/* Header Section */}
      <View style={tw`flex-row items-center justify-between mb-8`}>
        <View style={tw`flex flex-row items-center`}>
          <Image source={require('../../assets/logo.png')} style={tw`w-24 h-24`} resizeMode="contain" />
          <View style={tw`ml-4`}>
            <Text style={tw`text-3xl font-bold text-[#ed6c21]`}>
              Welcome Back, {user?.given_name} {user?.family_name}!
            </Text>
            <Text style={tw`text-lg text-white`}>
              You have {tasksNotCompleted} tasks uncompleted. Keep up the good work!
            </Text>
          </View>
        </View>
        <TouchableOpacity style={tw`bg-[#ed6c21] p-3 rounded-lg`} onPress={signOut}>
          <Text style={tw`text-white text-lg font-semibold`}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Main Container */}
      <View style={[tw`flex-1`, width > 768 ? tw`flex-row` : tw`flex-col`]}>
        {/* Task List */}
        <View style={[tw`flex-1`, width > 768 ? tw`mr-4` : tw`mb-4`, { maxHeight: 400 }]}>
          <Text style={tw`text-2xl font-bold text-white mb-4`}>Your Tasks</Text>
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={tw`text-white text-center mt-6`}>No tasks assigned for today.</Text>}
            style={{ flexGrow: 0 }}
          />
        </View>

        {/* Map Component */}
        <View style={[tw`flex-1`, { minHeight: 400 }]}>
          <Text style={tw`text-2xl font-bold text-white mb-4`}>Task Locations</Text>
          <MapComponent
            markers={tasks.map((task) => ({
              address: task.location,
              label: task.title,
              status: task.status,
            }))}
            apiKey={apiKey}
            mapId={mapId}
            selectedMarker={selectedTask ? { address: selectedTask.location, label: selectedTask.title } : undefined}
          />
        </View>
      </View>

      {/* Additional Sections */}
      <View style={tw`mt-8`}>
        <View style={tw`bg-white shadow-lg p-6 rounded-lg mb-4`}>
          <Text style={tw`text-xl font-bold text-[#ed6c21]`}>Earnings</Text>
          <Text style={tw`text-lg text-gray-700 mt-2`}>Total Earnings: £2,340.00</Text>
        </View>

        <View style={tw`bg-white shadow-lg p-6 rounded-lg mb-4`}>
          <Text style={tw`text-xl font-bold text-[#ed6c21]`}>Jobs Completed</Text>
          <Text style={tw`text-lg text-gray-700 mt-2`}>Total Completed: 12 Jobs</Text>
        </View>

        <View style={tw`bg-white shadow-lg p-6 rounded-lg`}>
          <Text style={tw`text-xl font-bold text-[#ed6c21]`}>Additional Information</Text>
          <Text style={tw`text-lg text-gray-700 mt-2`}>Keep track of your progress here.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
