import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, useWindowDimensions } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import MapComponent from '../components/HomeScreen/MapComponent';
import { apiKey, mapId } from '../../Constants';
import StatsOverview from '../components/HomeScreen/StatsOverview';
import OrientationBanner from '../components/HomeScreen/Banner';
import Header from '../components/Global/Header';

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  location: string;
  skillRequired: 'L1' | 'L2' | 'L3' | 'L4'; // Skill level
  hourlyPay: number; // Hourly pay in GBP
  projectDetails: string; // Description of the project
  floormanName: string; // Name of the floorman
  floormanPhone: string; // Phone number of the floorman
  installerShowedUp: boolean; // Whether the installer showed up
}


const HomeScreen = () => {
  const { signOut, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks: Task[] = [
      {
        id: '1',
        title: 'Install TV Mount',
        dueDate: new Date(),
        location: '4 Gala St, Glasgow, Scotland',
        skillRequired: 'L2',
        hourlyPay: 15.0,
        projectDetails: 'Install a 55-inch TV mount and tidy up cables.',
        floormanName: 'John Smith',
        floormanPhone: '+447911123456',
        installerShowedUp: true,
      },
      {
        id: '2',
        title: 'Home Theater Setup',
        dueDate: new Date(),
        location: 'Odeon Luxe, Glasgow, Scotland',
        skillRequired: 'L3',
        hourlyPay: 20.0,
        projectDetails: 'Setup a 7.1 surround sound system in the luxury theater.',
        floormanName: 'Jane Doe',
        floormanPhone: '+447812345678',
        installerShowedUp: false,
      },
    ];
    setTasks(fetchedTasks);
  };
  

  const handleOpenOrientation = async () => {
    throw new Error('Function not implemented.');
  }

  return (
    <View className="flex-1 bg-white">

      <Header tasks={tasks} />

      <View id="container" className="p-6">

        <View className="max-w-7xl w-full mx-auto">

        <OrientationBanner title="Orientation"
          description="The next step is completing our short orientation. Please click here to begin when you are ready. Once you have completed the orientation, this notification will remain until your account has been reviewed by our team."
          buttonLabel="Open Orientation"
          onPress={handleOpenOrientation}
        />

        <StatsOverview projectInvites={2} acceptedShifts={1} earnings="£2,340.00" />

      </View>

      </View>
    </View>
  );
};

export default HomeScreen;
