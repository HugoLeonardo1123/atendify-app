import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import { RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator();

export type StackTypes = NativeStackNavigationProp<RootStackParamList>;

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">{() => <Login />}</Stack.Screen>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
