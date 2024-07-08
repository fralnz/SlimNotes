import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import CustomSwitch from "react-native-custom-switch-new";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";
import NewNoteModal from "./components/NewNoteModal";
import { getAllKeys } from "./utils/storageTools"; // Ensure this returns a promise
import { transformDate, sortDates } from "./utils/dateTools";

const NotesList = () => {
  const [dateKeys, setDateKeys] = useState([]);
  const [customKeys, setCustomKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState([]);
  const [isDate, setIsDate] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchKeys = async () => {
      const keysArray = await getAllKeys();
      const { validDates, invalidDates } = sortDates(keysArray);
      setDateKeys(validDates);
      setCustomKeys(invalidDates);
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
        switchRightTextStyle={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
        }}
        buttonWidth={40}
        switchWidth={200}
        buttonPadding={2}
        switchBackgroundColor={"#0070F2"}
        onSwitchBackgroundColor={"#EAECEF"}
        onSwitch={() => {
          setVisibleKeys(dateKeys);
          setIsDate(true);
        }}
        onSwitchReverse={() => {
          setVisibleKeys(customKeys);
          setIsDate(false);
        }}
      />
      <Button title="Show modal" onPress={toggleModal} />
      <NewNoteModal isVisible={modalVisible} toggleModal={toggleModal} />
      {visibleKeys.length > 0 ? (
        visibleKeys.map((key, index) => (
          <Text key={index}>
            {isDate ? transformDate(key, "DD-MM-YYYY") : key}
          </Text>
        ))
      ) : (
        <Text>No notes found</Text>
      )}
    </SafeAreaView>
  );
};

export default NotesList;
