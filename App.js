import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LocationProvider } from "./context/LocationContext";
import usePushNotifications from "./hooks/usePushNotifications";

import MapScreen from "./screens/Map/MapScreen";
import WelcomeScreen from "./screens/Welcome/WelcomeScreen";
import AboutScreen from "./screens/About/AboutScreen";
import DetailScreen from "./screens/Detail/DetailScreen";
import RegisterForm from "./screens/Register/RegisterForm";
import LoginForm from "./screens/Login/LoginForm";

const Stack = createNativeStackNavigator();

export default function App() {
  const { getFCMToken } = usePushNotifications();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const registerToken = async () => {
      const token = await getFCMToken();

      if (token) {
        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_NOTIFICATIONS_BASE_URL}/subscribe`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${userJwt}` // for auth later
              },
              body: JSON.stringify({
                userId: user?.id ? user.id : "current_user_id_12345",
                platform: "mobile",
                pushToken: token,
              }),
            }
          );

          const data = await response.json();
          console.log("Backend response:", data); // will replace with
        } catch (err) {
          console.error("Failed to sync token with backend:", err);
        }
      }
    };

    registerToken();
  }, []);

  return (
    <LocationProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{}}>
          {/* <Stack.Navigator initialRouteName="Welcome" screenOptions={{}}> */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Map">
            {(props) => <MapScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: "About Karta",
            }}
          />
          <Stack.Screen name="Register">
            {(props) => <RegisterForm {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => <LoginForm {...props} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
