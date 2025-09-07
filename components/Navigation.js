import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPageScreen from "../pages/LoginPageScreen";
import HomePageScreen from "../pages/HomePageScreen";
import ActivityPageScreen from "../pages/ActivityPageScreen";
import ProfilePageScreen from "../pages/ProfilePageScreen";
import SettingsPageScreen from "../pages/SettingsPageScreen";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
    >
      <Stack.Screen name="LoginPage" component={LoginPageScreen} />
      <Stack.Screen name="HomePageScreen" component={HomePageScreen} />
      <Stack.Screen name="ActivityPage" component={ActivityPageScreen} />
      <Stack.Screen name="ProfilePage" component={ProfilePageScreen} />
      <Stack.Screen name="SettingsPage" component={SettingsPageScreen} />
    </Stack.Navigator>
  );
}
