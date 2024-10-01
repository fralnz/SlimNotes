import { StyleSheet } from "react-native";

const styleNoteEdit = StyleSheet.create({
  buttonBackGround: {
    backgroundColor: "#0070F2",
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
    elevation: 1, // Shadow elevation for Android
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 50,
    textAlign: "center",
  },
  deleteAnimation: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: 100,
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  plusButton: {
    zIndex: 3,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default styleNoteEdit;
