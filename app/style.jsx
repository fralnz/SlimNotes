import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    fontFamily: "Adamina-Regular",
    height: "100%",
    borderColor: "gray",
    borderWidth: 0,
    width: "100%",
    padding: 10,
    alignSelf: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  noteTitle: {
    fontFamily: "Adamina-Regular",
    fontWeight: 600,
    fontSize: 40,
  },
  title: {
    fontFamily: "Adamina-Regular",
    fontWeight: "500",
    fontSize: 50,
    position: "center",
    alignSelf: "center",
  },
});

export default styles;
