import { StyleSheet } from "react-native";

const styleConfig = StyleSheet.create({
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: "Adamina-Regular",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Adamina-Regular",
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  removeAllButton: {
    backgroundColor: "#d6d6d6",
    fontSize: 16,
    color: "black",
    padding: 15,
    fontWeight: "600",
    borderRadius: 10,
    marginTop: 20,
  },
});

export default styleConfig;
