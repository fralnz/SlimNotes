import { StyleSheet } from "react-native";

const styleModal = StyleSheet.create({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    marginHorizontal: 50,
    marginVertical: "20%", // Use percentage for better adaptability
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: "30%", // Ensure the modal has a minimum height
    maxHeight: "60%", // Restrict the modal height to avoid taking too much space
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "lightblue",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
    padding: 12,
    marginHorizontal: 5, // Add margin to buttons for better spacing
  },
  buttonText: {
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default styleModal;
