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
  bottomCardContainer: {
    position: "absolute",
    bottom: 30, // Floats above the bottom tab/edge
    left: 20,
    right: 20,
    zIndex: 100, // Ensures it sits on top of the map
  },
  bottomCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  detailsButton: {
    backgroundColor: "#8E44AD", // Your theme tint
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});