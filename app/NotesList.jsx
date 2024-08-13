import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Pressable, Alert, Animated } from "react-native";
import CustomSwitch from "react-native-custom-switch-new";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";
import NewNoteModal from "./components/NewNoteModal";
import { getAllKeys } from "./utils/storageTools";
import { transformDate, sortDates } from "./utils/dateTools";
import { router, useRouter } from "expo-router";
import BackHeader from "./components/BackHeader";
import { useNoteContext } from "./hooks/notes.hook";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DeleteIcon } from "./components/icons/DeleteIcon";

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

  useEffect(() => {
    const fetchKeys = async () => {
      const keysArray = await getAllKeys();
      const { validDates, invalidDates } = sortDates(keysArray);
      setDateKeys(validDates);
      setCustomKeys(invalidDates);
      setVisibleKeys(customKeys);
    };

    fetchKeys();
  }, [isFocused]);

  useEffect(() => {
    setVisibleKeys(customKeys);
  }, [customKeys]);

  const renderLeftActions = (progress, dragX, key) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-100, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX }],
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          width: 100,
          height: "100%",
        }}
      >
        <Pressable onPress={() => handleDelete(key)}>
          <DeleteIcon />
        </Pressable>
      </Animated.View>
    );
  };

  const handleDelete = (key) => {
    Alert.alert("Delete", `Are you sure you want to delete ${key}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          console.log(`Deleted: ${key}`);
        },
      },
    ]);
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
                    router.navigate({
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
