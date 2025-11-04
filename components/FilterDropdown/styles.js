import { StyleSheet, Platform } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";
const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: "center",
    marginRight: "50%",

  },
  picker: {
    color: Colors.text,
    // had to fix Picker on iOS which is otherwise too tall
    transform: Platform.OS === "ios" ? [{ scaleX: 0.9 }, { scaleY: 0.9 }] : [],
    width: "100%",
  },
});
