import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_OPENSTREETMAP } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { POI_DATA } from '../data/poi';

const styles = StyleSheet.create({ // will be moved to own file in future
  container: {
    flex: 99,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '90%',
  },
});

export default function MapScreen() {
  const { location, errorMsg, isLoading } = useLocation();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // Set the initial map region to the user's location, if any
  const initialRegion = location
    ? {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }
    : {
      // default coords (will specify later)
      latitude: 4.0502,
      longitude: 9.7676,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_OPENSTREETMAP}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {POI_DATA.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={poi.coordinates}
            title={poi.name}
            description={poi.type}
          />
        ))}
      </MapView>
    </View>
  );
}