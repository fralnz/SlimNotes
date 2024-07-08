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
    fontSize: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#d6d6d6",
    marginHorizontal: 5,
    width: "auto"
  },
  listContainer:{
    display: "flex",
    width: "100%"
  }
});

export default styleNotesList;
