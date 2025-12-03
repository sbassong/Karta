import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { WarmCommunityColors } from "../../utilities/theme";
import sendNotification from "../../utilities/sendNotification";

const Colors = WarmCommunityColors.light;
  const mockEventData = {
    userId: "current_user_id_12345",
    event: "WELCOME_MESSAGE",
    data: {
      name: "Abi", // Dynamic data to inject into the template
    },
  };

export default function MapButtons({ onHelpPress, onLocationPress, viewMode }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => sendNotification(mockEventData)}>
        <Ionicons name="send" size={24} color={Colors.tint} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onHelpPress}>
        <Ionicons name="help-circle" size={32} color={Colors.tint} />
      </TouchableOpacity>
      {viewMode === "map" && (
        <TouchableOpacity style={styles.button} onPress={onLocationPress}>
          <Ionicons name="navigate-circle" size={32} color={Colors.tint} />
        </TouchableOpacity>
      )}
    </View>
  );
}
