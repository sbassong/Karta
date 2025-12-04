import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingLeft: 10,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  carouselContainer: {
    height: 250,
    position: "relative",
    backgroundColor: "#f0f0f0",
  },
  scrollView: {
    height: "100%",
  },
  image: {
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 20,
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  link: {
    color: Colors.link,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 15,
    textAlign: "center",
  },
  type: {
    fontSize: 18,
    color: Colors.icon,
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationIcon: {
    color: Colors.text,
  },
  locationName: {
    fontSize: 18,
    color: Colors.text,
    marginLeft: 8,
  },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    padding: 5,
    marginTop: 10,
    marginRight: 5,
  },
  reportButton: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
  },
  reportButtonText: {
    fontSize: 16,
    color: Colors.link,
    fontWeight: "500",
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
    position: "absolute",
    bottom: 50,
  },
});
