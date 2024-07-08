import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, Pressable } from "react-native";
import CustomSwitch from "react-native-custom-switch-new";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";
import NewNoteModal from "./components/NewNoteModal";
import { getAllKeys } from "./utils/storageTools"; // Ensure this returns a promise
import { transformDate, sortDates } from "./utils/dateTools";
import { useRouter } from "expo-router";

const NotesList = () => {
  const [dateKeys, setDateKeys] = useState([]);
  const [customKeys, setCustomKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState([]);
  const [isDate, setIsDate] = useState(false);
  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchKeys = async () => {
      const keysArray = await getAllKeys();
      const { validDates, invalidDates } = sortDates(keysArray);
      setDateKeys(validDates);
      setCustomKeys(invalidDates);
      setVisibleKeys(customKeys);
    };

    fetchKeys();
  }, []);

  useEffect(() => {
    setVisibleKeys(customKeys);
  }, [customKeys]);

  return (
    <SafeAreaView
      style={[styleAndroid.droidSafeArea, styleNotesList.notesPage]}
    >
      <CustomSwitch
        switchLeftText={"Custom Notes"}
        switchLeftTextStyle={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
        }}
        switchRightText={"Daily Notes"}
        switchRightTextStyle={{
          color: "black",
          fontSize: 16,
          fontWeight: "600",
        }}
        buttonWidth={40}
        switchWidth={200}
        buttonPadding={2}
        switchBackgroundColor={"#EAECEF"}
        onSwitchBackgroundColor={"#0070F2"}
        startOnLeft={true}
        onSwitchReverse={() => {
          setVisibleKeys(dateKeys);
          setIsDate(true);
        }}
        onSwitch={() => {
          setVisibleKeys(customKeys);
          setIsDate(false);
        }}
      />
      <Button title="Show modal" onPress={toggleModal} />
      <NewNoteModal isVisible={modalVisible} toggleModal={toggleModal} />
      {visibleKeys.length > 0 ? (
        visibleKeys.map((key, index) => (
          <Pressable
            key={key}
            onPress={() => {
              router.push({
                pathname: "/",
                params: { key: key },
              });
            }}
          >
            <Text key={index} style={styleNotesList.list}>
              {isDate ? transformDate(key, "DD-MM-YYYY") : key}
            </Text>
          </Pressable>
        ))
      ) : (
        <Text>No notes found</Text>
      )}
    </SafeAreaView>
  );
};

export default NotesList;
