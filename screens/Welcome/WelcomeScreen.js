import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";
import { styles } from "./styles";

export default function WelcomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAllowPress = () => setModalVisible(true);

  const requestPermissions = async () => {
    setModalVisible(false);

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") navigation.replace("Map");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/cameroon.png")} style={styles.icon} />
        <Text style={styles.title}>Welcome to Karta, Your Village Map</Text>
        <Text style={styles.subtitle}>
          This app works OFFLINE. Find clinics, water, and other essential
          services near, even without internet.
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
              onPress={requestPermissions}
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
