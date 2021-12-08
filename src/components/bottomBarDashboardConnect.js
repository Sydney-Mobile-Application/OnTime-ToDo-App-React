import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as CallBack from "../index";

const Tab = createMaterialBottomTabNavigator();

const MyTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
            size = 22
          } else if (route.name === 'Add To Do') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            size = 22
          } else if (route.name === 'Setting Menu') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
            size = 22
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#293462',
        tabBarInactiveTintColor: 'gray',
      })}
      barStyle={{ backgroundColor: '#293462' }} initialRouteName='false'
    >
      <Tab.Screen name="Dashboard" component={CallBack.Dashboard} />
      <Tab.Screen name="Add To Do" component={CallBack.AddToDo} />
      <Tab.Screen name="Setting Menu" component={CallBack.SettingMenu} />
    </Tab.Navigator>
  );
}

export default MyTabs;