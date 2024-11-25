import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, useWindowDimensions } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import MapComponent from '../components/HomeScreen/MapComponent';
import { apiKey, mapId } from '../../Constants';
import StatsOverview from '../components/HomeScreen/StatsOverview';
import OrientationBanner from '../components/HomeScreen/Banner';
import Header from '../components/Global/Header';
import UpcomingShifts from '../components/HomeScreen/Shifts';

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  location: string;
  skillRequired: 'L1' | 'L2' | 'L3' | 'L4'; // Skill level
  timeStart: Date;
  timeEnd: Date;
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
        dueDate: new Date('2024-11-23'),
        location: '4 Gala St, Glasgow, Scotland',
        skillRequired: 'L2',
        timeStart: new Date('2024-11-23T09:00:00'),
        timeEnd: new Date('2024-11-23T13:00:00'),
        hourlyPay: 20,
        projectDetails: 'Install a wall-mounted TV for a client.',
        floormanName: 'John Doe',
        floormanPhone: '07123456789',
        installerShowedUp: true,
      },
      {
        id: '2',
        title: 'Home Theater Setup',
        dueDate: new Date('2024-11-24'),
        location: 'Odeon Luxe, Glasgow, Scotland',
        skillRequired: 'L3',
        timeStart: new Date('2024-11-24T10:00:00'),
        timeEnd: new Date('2024-11-24T14:00:00'),
        hourlyPay: 25,
        projectDetails: 'Set up a home theater system.',
        floormanName: 'Jane Smith',
        floormanPhone: '07123456788',
        installerShowedUp: false,
      },
    ];
    setTasks(fetchedTasks);
  };
  

  const handleOpenOrientation = async () => {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView className="flex-1 bg-white">

      <Header tasks={tasks} />

      <View id="container" className="p-6">

        <View className="max-w-7xl w-full mx-auto">

        <OrientationBanner title="Orientation"
          description="The next step is completing our short orientation. Please click here to begin when you are ready. Once you have completed the orientation, this notification will remain until your account has been reviewed by our team."
          buttonLabel="Open Orientation"
          onPress={handleOpenOrientation}
        />

        <StatsOverview projectInvites={2} acceptedShifts={1} earnings="£2,340.00" />

        <View className="">
          <UpcomingShifts tasks={tasks} />
        </View>


      </View>

      </View>
    </ScrollView>
  );
};

export default HomeScreen;
