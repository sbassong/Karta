import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapScreen from './screens/MapScreen';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // height: "10%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function App() {
  return (
    <>
    <View style={styles.container}>
      <Text>Test dd   ffv df</Text>
      <StatusBar style="auto" />
    </View>
    <MapScreen />
    </>
  );
}

