import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  
  topBar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    zIndex: 10,
  },
  toggleButton: {
    padding: 5,
  },

  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  calloutDescription: {
    fontSize: 14,
    color: "#333",
  },
  calloutLink: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 5,
    fontWeight: "bold",
  },
});