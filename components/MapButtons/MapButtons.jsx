import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export default function MapButtons({ onHelpPress, onLocationPress, viewMode }) {
  return (
    <View style={styles.container}>
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
