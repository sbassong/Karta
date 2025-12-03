import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "60%",
    height: "6%",
    borderRadius: 10,
    marginBottom: 10,
    margin: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#000000",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
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
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
});