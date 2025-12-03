import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    position: "relative",
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    position: "relative",
  },

  topBar: {
    position: "absolute",
    paddingHorizontal: 10,
    width: "100%",
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  toggleButton: {
    padding: 5,
  },

  calloutBubble: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  calloutText: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  calloutSubText: {
    fontSize: 12,
    color: "#666",
  },
});