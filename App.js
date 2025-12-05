import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {styles} from "./components/LoginIcon/styles"
import { LogBox } from "react-native";
// import * as SecureStore from "expo-secure-store";

import { LocationProvider } from "./context/LocationContext";
import usePushNotifications from "./hooks/usePushNotifications";

import MapScreen from "./screens/Map/MapScreen";
import WelcomeScreen from "./screens/Welcome/WelcomeScreen";
import AboutScreen from "./screens/About/AboutScreen";
import DetailScreen from "./screens/Detail/DetailScreen";
import RegisterForm from "./screens/Register/RegisterForm";
import LoginForm from "./screens/Login/LoginForm";
import LoginIcon from "./components/LoginIcon/LoginIcon";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  /MapLibre \[info\] Request Request failed due to a permanent error: Canceled .*/,
  'MapLibre [info] Request failed due to a permanent error: Canceled  {"level": "warning", "message": "Request failed due to a permanent error: Canceled ", "tag": "Mbgl-HttpRequest"}',
  "This method is deprecated (as well as all React Native Firebase namespaced API) and will be removed in the next major release as part of move to match Firebase Web modular SDK API. Please see migration guide for more details: https://rnfirebase.io/migrating-to-v22. Method called was `onTokenRefresh`. Please use `onTokenRefresh()` instead.",
  "This method is deprecated (as well as all React Native Firebase namespaced API) and will be removed in the next major release as part of move to match Firebase Web modular SDK API. Please see migration guide for more details: https://rnfirebase.io/migrating-to-v22. Method called was `onTokenRefresh`. Please use `onTokenRefresh()` instead.",
  /Request failed due to a permanent error" .* /,
  /This method is deprecated .*/,
]);

export default function App() {
  const { registerToken } = usePushNotifications();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleSubscription = async () => {
      if (user && user.id) {
        await registerToken(user.id);
      }
      // TODO:
      // Will need to create an endpoint to fetch user, and compare token
      // secureStore
      // const token = await SecureStore.getItemAsync('userToken');
    };

    handleSubscription();
  }, [user]);

  return (
    <LocationProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          {(props) => <MapScreen {...props} user={user} />}
          <Stack.Screen name="Details">
            {(props) => <DetailScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <RegisterForm {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => <LoginForm {...props} user={user} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={({ navigation }) => ({
              headerRight: () => {
                console.log("User ==> ", user);
                return !user ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <LoginIcon />
                  </TouchableOpacity>
                ) : (
                  <Text>{`Welcome ${user?.email}`}</Text>
                );
              },
            })}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
