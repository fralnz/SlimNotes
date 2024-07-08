import { StyleSheet } from "react-native";

const styleModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modal: {
    backgroundColor: "white",
    padding: 35,
    borderRadius: 20,
    width: "80%", // Maintain the width of the modal
    height: 200, // Decrease the height of the modal
  },
  modalContent: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: 50, // Maintain the height of the text input
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15, // Maintain the padding of the buttons
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18, // Maintain the font size of the button text
    color: "white",
    fontWeight: "bold",
  },
});

export default styleModal;
