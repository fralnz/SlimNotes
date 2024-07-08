import { StyleSheet } from "react-native";

const styleNotesList = StyleSheet.create({
  notesPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 64,
  },
  list: {
    fontFamily: "Adamina-Regular",
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
});

export default styleNotesList;
