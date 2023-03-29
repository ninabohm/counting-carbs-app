import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{
          headerStyle: { backgroundColor: '#1EC969' },
          headerTintColor: '#FFF',
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        options={{
          headerStyle: { backgroundColor: '#1EC969' },
          headerTintColor: '#FFF',
        }}
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}
