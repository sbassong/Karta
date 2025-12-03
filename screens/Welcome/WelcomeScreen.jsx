import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

import { useLocationPermissions } from "../../context/LocationContext";

export default function WelcomeScreen({ navigation }) {
  const { permissionStatus, requestPermissions } = useLocationPermissions();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (permissionStatus === "granted") {
      navigation.replace("Map");
    }
  }, [permissionStatus, navigation]);

  const handleAllowPress = async () => {
    setModalVisible(true);
  };

  const handlePermissionRequest = async () => {
    setModalVisible(false);

    const status = await requestPermissions();
    if (status === "granted") {
      navigation.replace("Map");
    }
  };

  if (permissionStatus === null) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/cameroon.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>Welcome to Karta, Your Village Map</Text>
        <Text style={styles.subtitle}>
          Find clinics, water, and other essential
          services near.
        </Text>
        <Text style={styles.body}>
          To show local services, Karta needs to access your location.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAllowPress}>
        <Text style={styles.buttonText}>Allow Location Access</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              To show your location on the map, Karta needs permission to use
              your phone GPS
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handlePermissionRequest}
            >
              <Text style={styles.buttonText}>Yes, I understand</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalLink}>No, thanks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
