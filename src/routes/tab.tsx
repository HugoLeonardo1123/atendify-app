import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Horario } from "../screens/Horario";
import { MaterialIcons } from '@expo/vector-icons';
import {Agendar} from "../screens/Agendar";

const Tab = createBottomTabNavigator();

export default function TabComponent({ onLogout }: { onLogout: () => void }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof MaterialIcons.glyphMap = "help-outline";

                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Horario") {
                        iconName = "schedule";
                    } else if (route.name === "Agendar") {
                        iconName = "event";
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Horario" component={Horario} />
            <Tab.Screen name="Agendar" component={Agendar} />
        </Tab.Navigator>
    );
}
