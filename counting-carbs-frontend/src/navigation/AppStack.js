import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmissionsScreen from '../screens/EmissionsScreen';
import PlaidLoginScreen from '../screens/PlaidLoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import MenuScreen from '../screens/MenuScreen';
import Header from '../components/Header';
import GoogleScreen from '../screens/GoogleScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen
        name="LoadingScreen"
        options={{ headerShown: false }}
        component={LoadingScreen}
      />
      <Stack.Screen
        name="PlaidLoginScreen"
        options={{ headerShown: false }}
        component={PlaidLoginScreen}
      />
      <Stack.Screen
        name="GoogleScreen"
        options={{ headerShown: false }}
        component={GoogleScreen}
      />
      <Stack.Screen
        name="EmissionsScreen"
        options={{ headerShown: false }}
        component={EmissionsScreen}
      />
      <Stack.Screen
        name="Header"
        options={{ headerShown: false }}
        component={Header}
      />
      <Stack.Screen
        name="MenuScreen"
        options={{ headerShown: false }}
        component={MenuScreen}
      />
    </Stack.Navigator>
  );
}
