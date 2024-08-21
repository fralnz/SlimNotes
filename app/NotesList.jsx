import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Pressable, Alert, Animated } from "react-native";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";
import NewNoteModal from "./components/NewNoteModal";
import { getAllKeys } from "./hooks/storage.hooks";
import { sortDates } from "./hooks/date.hooks";
import BackHeader from "./components/BackHeader";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styleNoteEdit from "./style/styleNoteEdit";
import NotesSwitch from "./components/NotesSwitch";
import SwipeableNote from "./components/SwipeableNote";

const NotesList = () => {
  const [dateKeys, setDateKeys] = useState([]);
  const [customKeys, setCustomKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState([]);
  const [isDate, setIsDate] = useState(false);
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

  return (
    <SafeAreaView
      style={[styleAndroid.droidSafeArea, styleNotesList.notesPage]}
    >
      <BackHeader />
      <NotesSwitch
        setVisibleKeys={setVisibleKeys}
        dateKeys={dateKeys}
        customKeys={customKeys}
        setIsDate={setIsDate}
      />
      <GestureHandlerRootView style={styleNotesList.listContainer}>
        {visibleKeys.length > 0 ? (
          <FlashList
            data={visibleKeys}
            renderItem={({ item }) => (
              <SwipeableNote
                item={item}
                dateKeys={dateKeys}
                customKeys={customKeys}
                setCustomKeys={setCustomKeys}
                setDateKeys={setDateKeys}
                setVisibleKeys={setVisibleKeys}
                isDate={isDate}
              />
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
