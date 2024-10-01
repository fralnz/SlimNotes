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
import NotesSwitch from "./components/NotesSwitch";
import SwipeableNote from "./components/SwipeableNote";
import NewNoteButton from "./components/NewNoteButton";

const NotesList = () => {
  const [dateKeys, setDateKeys] = useState([]);
  const [customKeys, setCustomKeys] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [todoModalVisible, setTodoModalVisible] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState([]);
  const [isDate, setIsDate] = useState(false);
  const isFocused = useIsFocused();

  const toggleNoteModal = () => {
    setNoteModalVisible(!noteModalVisible);
  };

  const toggleTodoModal = () => {
    setTodoModalVisible(!todoModalVisible);
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
      <NewNoteButton action1={toggleNoteModal} action2={toggleTodoModal} />
      <NewNoteModal
        isVisible={noteModalVisible}
        toggleModal={toggleNoteModal}
      />
      <NewNoteModal
        isVisible={todoModalVisible}
        toggleModal={toggleTodoModal}
        placeHolder={"Name of the To-Do List"}
      />
    </SafeAreaView>
  );
};

export default NotesList;
