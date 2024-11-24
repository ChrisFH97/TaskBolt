import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GenericModal from '../Global/Modal';
import MapComponent from './MapComponent';
import { apiKey, mapId } from '../../../Constants';

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  location: string;
  skillRequired: 'L1' | 'L2' | 'L3' | 'L4';
  timeStart: Date;
  timeEnd: Date;
  hourlyPay: number;
  projectDetails: string;
  floormanName: string;
  floormanPhone: string;
  installerShowedUp: boolean;
}

interface UpcomingShiftsProps {
  tasks: Task[];
}

const UpcomingShifts = ({ tasks }: UpcomingShiftsProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Dynamically load Google Maps script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (document.getElementById('google-maps-script')) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&map_ids=${mapId}&libraries=places,marker`;
      script.id = 'google-maps-script';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsScriptLoaded(true);
      script.onerror = () => console.error('Failed to load Google Maps script');
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const shifts = tasks.map((task) => ({
    day: task.dueDate.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    }),
    shiftDetails: `${new Date(task.timeStart).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })} - ${new Date(task.timeEnd).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    task,
  }));

  const groupedShifts = shifts.reduce((acc, shift) => {
    if (!acc[shift.day]) acc[shift.day] = [];
    acc[shift.day].push(shift);
    return acc;
  }, {} as Record<string, typeof shifts>);

  const nextFiveDays = Object.entries(groupedShifts).slice(0, 5);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  return (
    <View className="mt-2">
      <Text className="text-2xl font-bold text-taskbolt-blue">Your Upcoming Shifts</Text>
      <View className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {nextFiveDays.map(([day, shiftDetails], index) => (
          <View
            key={index}
            className="border rounded-md p-4 bg-white shadow-sm"
          >
            <Text className="font-semibold text-sm text-taskbolt-blue">{day}</Text>
            {shiftDetails.length > 0 ? (
              <View className="mt-2 space-y-1">
                {shiftDetails.map(({ shiftDetails: times, task }, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => openModal(task)}
                    className="text-xs text-gray-700 hover:bg-gray-100 hover:shadow-lg p-1 rounded-md"
                  >
                    <Text className="text-xs text-gray-700">{times}</Text>
                    <Text className="text-[10px] text-gray-500">Tap for details</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text className="mt-2 text-xs text-gray-400">No shifts</Text>
            )}
          </View>
        ))}
      </View>

      {selectedTask && (
        <GenericModal
          visible={modalVisible}
          onClose={closeModal}
          title={`Shift Details - ${selectedTask.title}`}
        >
          <View>
            {/* Map Section */}
            <View className="w-full h-60 mx-auto md:w-full md:h-80 mb-4 border border-gray-300">
              {isScriptLoaded ? (
                <MapComponent
                  address={selectedTask.location}
                  label={selectedTask.title}
                  apiKey={apiKey}
                  mapId={mapId}
                />
              ) : (
                <Text className="text-center text-gray-500 mt-6">Loading map...</Text>
              )}
            </View>

            {/* Contact Details */}
            <View className="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-[#e7e7e7]">
              <Text className="text-sm font-bold">Floorman Name:</Text>
              <Text className="text-sm text-right">{selectedTask.floormanName}</Text>

              <Text className="text-sm font-bold">Phone Number:</Text>
              <Text className="text-sm text-right">{selectedTask.floormanPhone}</Text>
            </View>

            {/* Shift Details */}
            <View className="grid grid-cols-2 gap-2 mb-2">
              <Text className="text-sm font-bold">Hourly Pay:</Text>
              <Text className="text-sm text-right">£{selectedTask.hourlyPay}</Text>

              <Text className="text-sm font-bold">Skill Level:</Text>
              <Text className="text-sm text-right">{selectedTask.skillRequired}</Text>

              <Text className="text-sm font-bold">Time:</Text>
              <Text className="text-sm text-right">
                {`${new Date(selectedTask.timeStart).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })} - ${new Date(selectedTask.timeEnd).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Text>
            </View>

            {/* Project Details */}
            <View className="mb-4">
              <Text className="text-sm font-bold">Project Description:</Text>
              <Text className="text-sm">{selectedTask.projectDetails}</Text>
            </View>
          </View>
        </GenericModal>
      )}
    </View>
  );
};

export default UpcomingShifts;
