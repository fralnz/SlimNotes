import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import styleModal from "../style/styleModal";
import { useRouter } from "expo-router";
import { useNoteContext } from "../hooks/notes.hook";

const NewNoteModal = ({
  isVisible,
  toggleModal,
  placeHolder = "Name of the new note",
  type = null,
}) => {
  const [newNote, setNewNote] = useState("");
  const router = useRouter();
  const { setType } = useNoteContext();

  const onTextChange = (text) => {
    setNewNote(text);
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={styleModal.modalContainer}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styleModal.modal}
      >
        <View style={styleModal.modalContent}>
          <TextInput
            placeholder={placeHolder}
            value={newNote}
            onChangeText={onTextChange}
            style={styleModal.textInput}
            multiline={false}
            autoFocus={true}
          />
          <View style={styleModal.buttonsContainer}>
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/",
                  params: { key: newNote },
                });
                setType(type);
                toggleModal();
              }}
              style={[styleModal.button, { backgroundColor: "#0070F2" }]}
            >
              <Text style={[styleModal.buttonText, { color: "white" }]}>
                Confirm
              </Text>
            </Pressable>
            <Pressable
              onPress={toggleModal}
              style={[styleModal.button, { backgroundColor: "#EAECEF" }]}
            >
              <Text style={[styleModal.buttonText, { color: "black" }]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NewNoteModal;
