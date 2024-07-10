import { StyleSheet } from "react-native";

const styleNoteEditor = StyleSheet.create({
  noteContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputBox: {
    fontFamily: "Adamina-Regular",
    width: "100%",
    borderWidth: 0,
  },
  noteText: {
    fontFamily: "Adamina-Regular",
    fontSize: 16, // 1rem converted to dp
  },
  noteTitle: {
    fontFamily: "Adamina-Regular",
    fontSize: 48, // 3rem converted to dp
    fontWeight: "500", // Use string '500'
    marginTop: 20,
  },
});

export default styleNoteEditor;
