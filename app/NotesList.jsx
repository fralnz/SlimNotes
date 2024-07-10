import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import CustomSwitch from "react-native-custom-switch-new";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";
import NewNoteModal from "./components/NewNoteModal";
import { getAllKeys, getData } from "./utils/storageTools";
import { transformDate, sortDates } from "./utils/dateTools";
import { useRouter } from "expo-router";
import ToastConfig from "./utils/Toast";
import Toast from "react-native-toast-message";
import BackHeader from "./components/BackHeader";

const NotesList = () => {
  const [dateKeys, setDateKeys] = useState([]);
  const [customKeys, setCustomKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState([]);
  const [isDate, setIsDate] = useState(false);
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");
  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchKeys = async () => {
      const df = await getData("@dateformat");
      setDateFormat(df);
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
      <BackHeader />
      <ToastConfig />
      <Toast />
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
      <View style={styleNotesList.listContainer}>
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
                {isDate ? transformDate(key, dateFormat) : key}
              </Text>
            </Pressable>
          ))
        ) : (
          <Text>No notes found</Text>
        )}
      </View>
      <Pressable onPress={toggleModal}>
        <Text
          style={{
            backgroundColor: "#0070F2",
            fontSize: 16,
            color: "white",
            padding: 15,
            fontWeight: 600,
            borderRadius: 20,
            marginTop: 20,
          }}
        >
          New Note
        </Text>
      </Pressable>
      <NewNoteModal isVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
};

export default NotesList;
