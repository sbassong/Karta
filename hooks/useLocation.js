import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // first ask permission to get and use location data
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      // then we can get the location
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        setErrorMsg('Could not fetch location');
      }
      setIsLoading(false);
    })();
  }, []);

  return { location, errorMsg, isLoading };
};