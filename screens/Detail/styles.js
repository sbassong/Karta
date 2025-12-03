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
    paddingTop: 10,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  carouselContainer: {
    marginTop: 5,
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
  // container: {
  //   position: "absolute",
  //   bottom: 30,
  //   right: 20,
  //   alignItems: "center",
  // },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    // backgroundColor: "white",
    // borderRadius: 20,
    padding: 5,
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    // shadowOffset: { width: 0, height: 2 },
    marginTop: 10,
    marginRight: 10,
  },
});
