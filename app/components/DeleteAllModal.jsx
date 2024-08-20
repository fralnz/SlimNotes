import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import styleModal from "../style/styleModal";
import { removeAll } from "../hooks/storage.hooks";

const DeleteAllModal = ({ isVisible, toggleModal }) => {
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
          <Text>
            Are you sure you want to delete all notes? This action cannot be
            undone.
          </Text>
          <View style={styleModal.buttonsContainer}>
            <Pressable
              onPress={() => {
                removeAll();
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

export default DeleteAllModal;
