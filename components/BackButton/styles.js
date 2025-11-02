import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.tint,
    borderRadius: 10,
  },
  backButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
