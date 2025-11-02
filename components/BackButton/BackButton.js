import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../BackButton/styles";

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.backButtonText}>{"< Back"}</Text>
    </TouchableOpacity>
  );
}
