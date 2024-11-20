import React from 'react';
import { View } from 'react-native';
import StatCard from './StatCard';

interface StatsOverviewProps {
  projectInvites: number;
  acceptedShifts: number;
  earnings: string;
}

const StatsOverview = ({ projectInvites, acceptedShifts, earnings }: StatsOverviewProps) => {
  return (
    <View className="flex flex-row flex-wrap mb-6">
      <View className="w-full md:w-1/3 py-2">
        <StatCard title="Project Invites" value={projectInvites} />
      </View>
      <View className="w-full md:w-1/3 md:p-2">
        <StatCard title="Accepted Shifts" value={acceptedShifts} />
      </View>
      <View className="w-full md:w-1/3 py-2">
        <StatCard title="Earnings" value={earnings} />
      </View>
    </View>
  );
};

export default StatsOverview;
