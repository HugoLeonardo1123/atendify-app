import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator, BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import { Home } from '../screens/Home';
import { Login } from '../screens/Login';
import TabComponent from "./tab";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Screen name="Login">
                        {() => <Login onLogin={() => setIsAuthenticated(true)} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Tabs">
                        {() => <TabComponent onLogout={() => setIsAuthenticated(false)} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}