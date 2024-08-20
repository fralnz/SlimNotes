import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Pressable, Alert, Animated } from "react-native";
import CustomSwitch from "react-native-custom-switch-new";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";
import NewNoteModal from "./components/NewNoteModal";
import { getAllKeys, removeValue } from "./hooks/storage.hooks";
import { transformDate, sortDates } from "./hooks/date.hooks";
import { useRouter } from "expo-router";
import BackHeader from "./components/BackHeader";
import { useNoteContext } from "./hooks/notes.hook";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DeleteIcon } from "./components/icons/DeleteIcon";
import styleNoteEdit from "./style/styleNoteEdit";

const NotesList = () => {
  const [dateKeys, setDateKeys] = useState([]);
  const [customKeys, setCustomKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState([]);
  const [isDate, setIsDate] = useState(false);
  const router = useRouter();
  const { dateFormat } = useNoteContext();
  const isFocused = useIsFocused();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const fetchKeys = async () => {
    const keysArray = await getAllKeys();
    const { validDates, invalidDates } = sortDates(keysArray);
    setDateKeys(validDates);
    setCustomKeys(invalidDates);
    setVisibleKeys(isDate ? validDates : invalidDates);
  };

  useEffect(() => {
    fetchKeys();
  }, [isFocused]);

  // Ensure visibleKeys updates correctly when customKeys or dateKeys change
  useEffect(() => {
    setVisibleKeys(isDate ? dateKeys : customKeys);
  }, [customKeys, dateKeys]);

  const handleDelete = async (key) => {
    Alert.alert("Delete", `Are you sure you want to delete ${key}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeValue(key);

          // Filter out the deleted key from both dateKeys and customKeys
          const updatedDateKeys = dateKeys.filter((dateKey) => dateKey !== key);
          const updatedCustomKeys = customKeys.filter(
            (customKey) => customKey !== key,
          );

          setDateKeys(updatedDateKeys);
          setCustomKeys(updatedCustomKeys);

          // Update visible keys accordingly
          setVisibleKeys(isDate ? updatedDateKeys : updatedCustomKeys);
        },
      },
    ]);
  };

  const renderLeftActions = (progress, dragX, key) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-100, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styleNoteEdit.deleteAnimation, {transform: [{ translateX }]}]}
      >
        <Pressable onPress={() => handleDelete(key)}>
          <DeleteIcon />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView
      style={[styleAndroid.droidSafeArea, styleNotesList.notesPage]}
    >
      <BackHeader />
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
      <GestureHandlerRootView style={styleNotesList.listContainer}>
        {visibleKeys.length > 0 ? (
          <FlashList
            data={visibleKeys}
            renderItem={({ item }) => (
              <Swipeable
                renderLeftActions={(progress, dragX) =>
                  renderLeftActions(progress, dragX, item)
                }
              >
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/",
                      params: { key: item },
                    })
                  }
                >
                  <Text style={styleNotesList.list}>
                    {isDate ? transformDate(item, dateFormat) : item}
                  </Text>
                </Pressable>
              </Swipeable>
            )}
            estimatedItemSize={200}
          />
        ) : (
          <Text style={styleNotesList.list}>No notes found</Text>
        )}
      </GestureHandlerRootView>
      <Pressable onPress={toggleModal} style={styleNoteEdit.buttonBackGround}>
        <Text style={styleNoteEdit.buttonText}>+</Text>
      </Pressable>
      <NewNoteModal isVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
};

export default NotesList;
