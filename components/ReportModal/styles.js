import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "85%",
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.icon,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.text,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.icon,
    backgroundColor: "transparent",
  },
  chipText: {
    color: Colors.text,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 10,
    padding: 10,
    height: 80,
    textAlignVertical: "top", // Android fix for multiline
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#e0e0e0",
  },
  submitBtn: {
    backgroundColor: Colors.tint,
  },
  cancelText: {
    fontWeight: "bold",
    color: "#333",
  },
  submitText: {
    fontWeight: "bold",
    color: "white",
  },
});
