import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
        <></>
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={<HomeScreen>} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
