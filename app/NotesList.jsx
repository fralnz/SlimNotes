import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import CustomSwitch from "react-native-custom-switch-new";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";
import NewNoteModal from "./components/NewNoteModal";
import { getAllKeys } from "./utils/storageTools"; // Ensure this returns a promise
import { transformDate, sortDates } from "./utils/dateTools";

const NotesList = () => {
  const [keys, setKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchKeys = async () => {
      const keysArray = await getAllKeys();
      setKeys(sortDates(keysArray));
    };

    fetchKeys();
  }, []);

  return (
      <SafeAreaView
          style={[styleAndroid.droidSafeArea, styleNotesList.notesPage]}
      >
        <CustomSwitch
            switchLeftText={"Daily Notes"}
            switchLeftTextStyle={{
              color: "black",
              fontSize: 16,
              fontWeight: "600",
            }}
            switchRightText={"Custom Notes"}
            switchRightTextStyle={{ color: "white", fontSize: 16, fontWeight: "600" }}
            buttonWidth={40}
            switchWidth={200}
            buttonPadding={2}
            switchBackgroundColor={"#0070F2"}
            onSwitchBackgroundColor={"#EAECEF"}
        />
        <Button title="Show modal" onPress={toggleModal} />
        <NewNoteModal isVisible={modalVisible} toggleModal={toggleModal} />
        {keys.length > 0 ? (
            keys.map((key, index) => (
                <Text key={index}>{transformDate(key, "DD-MM-YYYY")}</Text>
            ))
        ) : (
            <Text>No notes found</Text>
        )}
      </SafeAreaView>
  );
};

export default NotesList;
