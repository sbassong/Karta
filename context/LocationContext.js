// adding to fix error flow where user is asked for permissions before welcome screen
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // checks permission without asking user
  const checkPermissions = useCallback(async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status === 'granted') {
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (err) {
        setErrorMsg('Could not fetch location.');
      }
    }
  }, []);

  const requestPermissions = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status === 'granted') {
      checkPermissions();
    } else {
      setErrorMsg('Permission to access location was denied.');
    }
    return status; // return status to the WelcomeScreen
  }, [checkPermissions]);

  // check current status on app load
  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  const value = {
    permissionStatus,
    location,
    errorMsg,
    requestPermissions,
    checkPermissions,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

// custom hook to use loc status
export const useLocationPermissions = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error(
      'useLocationPermissions must be used within a LocationProvider'
    );
  }
  return context;
};