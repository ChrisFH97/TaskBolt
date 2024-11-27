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
    const response = await fetch(`/api/tasks/installer/${user.userId}`);
    const fetchedTasks = await response.json();
    setTasks(fetchedTasks);
  };
  

  const handleOpenOrientation = async () => {
    throw new Error('Function not implemented.');
  }

  return (
    <View className='flex-1 bg-white'>

      <Header tasks={tasks} />

      <View id="container" className="p-6">

        <View className="max-w-7xl w-full mx-auto">

        <OrientationBanner title="Orientation"
          description="The next step is completing our short orientation. Please click here to begin when you are ready. Once you have completed the orientation, this notification will remain until your account has been reviewed by our team."
          buttonLabel="Open Orientation"
          onPress={handleOpenOrientation}
        />

        <StatsOverview projectInvites={2} acceptedShifts={tasks.length} earnings="£2,340.00" />

        <View className="">
          <UpcomingShifts tasks={tasks} />
        </View>


      </View>

      </View>
    </View>
  );
};

export default HomeScreen;
