import { Pressable, Text } from "react-native";
import styleConfig from "../style/styleConfig";
import DeleteAllModal from "./DeleteAllModal";
import React, { useState } from "react";

const DeleteAllButton = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const toggleModalVisible = () => {
    setDeleteModalVisible(!deleteModalVisible);
  };
  return (
    <Pressable
      style={{ zIndex: -5 }}
      onPress={() => {
        toggleModalVisible();
      }}
    >
      <Text style={styleConfig.removeAllButton}>Remove all Notes</Text>
      <DeleteAllModal
        isVisible={deleteModalVisible}
        toggleModal={toggleModalVisible}
      />
    </Pressable>
  );
};

export default DeleteAllButton;
