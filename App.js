import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LocationProvider } from "./context/LocationContext";

import MapScreen from "./screens/Map/MapScreen";
import WelcomeScreen from "./screens/Welcome/WelcomeScreen";
import AboutScreen from "./screens/About/AboutScreen";
import DetailScreen from "./screens/Detail/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LocationProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: "About Karta",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
