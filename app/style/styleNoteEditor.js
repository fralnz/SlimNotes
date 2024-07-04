import { StyleSheet } from "react-native";

const styleNoteEditor = StyleSheet.create({
  noteContainer: {
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  noteText: {
    fontFamily: "Adamina-Regular",
    fontSize: "1rem",
  },
  noteTitle: {
    fontFamily: "Adamina-Regular",
    fontSize: "3rem",
    fontWeight: 500,
  },
});

export default styleNoteEditor;
