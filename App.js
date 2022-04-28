import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as CallBack from "./src/index";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Get Started" component={CallBack.GetStarted} />
        {/* Example Resources */}
        <Stack.Screen
          name="Switcher"
          component={CallBack.Switcher}
          options={{ title: "Welcome To ToDo App Sydney" }}
        />
        <Stack.Screen
          name="Example Home"
          component={CallBack.HomeScreen}
          options={{ title: "Welcome To ToDo App Sydney" }}
        />
        <Stack.Screen
          name="Example Profile"
          component={CallBack.ProfileScreen}
        />
        <Stack.Screen
          name="Example Inner Page"
          component={CallBack.InnerScreen}
        />
        <Stack.Screen
          name="Example Double Inner Page"
          component={CallBack.DoubleInnerScreen}
        />
        {/* Real Pages */}
        <Stack.Screen name="Register" component={CallBack.Register} />
        <Stack.Screen
          name="Terms And Condition"
          component={CallBack.TermAndCondition}
        />
        <Stack.Screen name="Sign In" component={CallBack.SignIn} />
        <Stack.Screen
          name="Sign In Successfully"
          component={CallBack.SignInSuccessfully}
        />
        <Stack.Screen
          name="Dashboard"
          component={CallBack.DashboardConnection}
        />
        <Stack.Screen 
        name="Add To Do" 
        component={CallBack.AddToDo} 
        />
        <Stack.Screen 
        name="Edit To Do" 
        component={CallBack.EditToDo} 
        />
        <Stack.Screen
          name="Add To Do Setting"
          component={CallBack.AddToDoSetting}
        />
        <Stack.Screen
          name="Add To Do Calendar"
          component={CallBack.AddToDoCalendar}
        />
        <Stack.Screen
          name="Add To Do Time"
          component={CallBack.AddToDoTime}
        />
        <Stack.Screen
          name="To Do Priority"
          component={CallBack.ToDoParentPage}
        />
        <Stack.Screen
          name="To Do Upcoming"
          component={CallBack.ToDoParentPage}
        />
        <Stack.Screen
          name="To Do Completed"
          component={CallBack.ToDoParentPage}
        />
        <Stack.Screen name="Setting Menu" component={CallBack.SettingMenu} />
        <Stack.Screen name="Profile" component={CallBack.Profile} />
        <Stack.Screen name="Edit Profile" component={CallBack.EditProfile} />
        <Stack.Screen
          name="Language Setting"
          component={CallBack.LanguageSetting}
        />
        <Stack.Screen name="Backup Data" component={CallBack.BackupData} />
        <Stack.Screen name="Help Support" component={CallBack.HelpSupport} />
        <Stack.Screen name="Permission" component={CallBack.Permission} />
        <Stack.Screen name="About" component={CallBack.About} />
        <Stack.Screen name="Change Password" component={CallBack.ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
