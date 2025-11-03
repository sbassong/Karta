import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export default function FilterDropdown({ filter, onValueChange }) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filter}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor={Colors.text}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Water" value="Water" />
      </Picker>
    </View>
  );
}
