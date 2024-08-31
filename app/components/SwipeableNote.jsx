import { Alert, Animated, Pressable, Text } from "react-native";
import styleNotesList from "../style/styleNotesList";
import { transformDate } from "../hooks/date.hooks";
import Swipeable from "react-native-gesture-handler/Swipeable";
import React from "react";
import { removeValue } from "../hooks/storage.hooks";
import styleNoteEdit from "../style/styleNoteEdit";
import { DeleteIcon } from "./icons/DeleteIcon";
import { useNoteContext } from "../hooks/notes.hook";
import { useRouter } from "expo-router";

const SwipeableNote = ({
  item,
  dateKeys,
  customKeys,
  setDateKeys,
  setCustomKeys,
  setVisibleKeys,
  isDate,
}) => {
  const { dateFormat } = useNoteContext();
  const router = useRouter();

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
        style={[styleNoteEdit.deleteAnimation, { transform: [{ translateX }] }]}
      >
        <Pressable onPress={() => handleDelete(key)}>
          <DeleteIcon />
        </Pressable>
      </Animated.View>
    );
  };

  return (
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
  );
};

export default SwipeableNote;
