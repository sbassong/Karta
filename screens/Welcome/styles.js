import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

// starting with light but will figure out using system settings for conditional render later
const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 30,
    tintColor: Colors.tint,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.tint,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },

  // modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  modalTitle: {
    fontSize: 18,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 24,
  },
  modalButton: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.tint,
    borderRadius: 10,
    alignItems: "center",
  },
  modalLink: {
    fontSize: 16,
    color: Colors.link,
    marginTop: 15,
    fontWeight: "500",
  },
});
