import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 10,
  },

  formContent: {
    paddingHorizontal: 30,
    width: "100%",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: Colors.icon,
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,

    //subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  link: {
    color: Colors.link,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 15,
    textAlign: "center",
  },

  button: {
    backgroundColor: Colors.tint,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",

    shadowColor: Colors.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  buttonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: "600",
  },

  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
  },
});