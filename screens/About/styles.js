import { StyleSheet } from "react-native";
import { WarmCommunityColors } from "../../utilities/theme"; 

const Colors = WarmCommunityColors.light;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 10,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  content: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 25,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    color: Colors.link,
    fontWeight: "500",
    marginTop: 5,
    textDecorationLine: "underline",
  },
});
