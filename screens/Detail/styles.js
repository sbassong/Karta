import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  carouselContainer: {
    height: 250,
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
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
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
});
