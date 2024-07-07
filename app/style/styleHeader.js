import { StyleSheet } from "react-native";

const styleHeader = StyleSheet.create({
  header: {
    maxHeight: 32,
    width: "100%",
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  icon: {
    height: 32,
    width: 32,
  },
});

export default styleHeader;
