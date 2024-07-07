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
  headerView: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    height: 32,
    width: 32,
    marginHorizontal: 4,
  },
});

export default styleHeader;
