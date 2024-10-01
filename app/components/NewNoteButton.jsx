import React, { useState, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import styleNoteEdit from "../style/styleNoteEdit";
import { NoteIcon } from "./icons/NoteIcon";
import { ToDoIcon } from "./icons/ToDoIcon";

const NewNoteButton = ({ action1, action2 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const button1Anim = useRef(new Animated.Value(0)).current;
  const button2Anim = useRef(new Animated.Value(0)).current;

  const toggleButtons = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      Animated.parallel([
        Animated.timing(button1Anim, {
          toValue: -80,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(button2Anim, {
          toValue: -160,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(button1Anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(button2Anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <View style={styleNoteEdit.buttonContainer}>
      <Animated.View
        style={[
          styleNoteEdit.buttonBackGround,
          { transform: [{ translateY: button2Anim }] },
        ]}
      >
        <Pressable
          style={styleNoteEdit.iconButton}
          onPress={() => {
            action2();
          }}
        >
          <ToDoIcon width={30} height={30} />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          styleNoteEdit.buttonBackGround,
          { transform: [{ translateY: button1Anim }] },
        ]}
      >
        <Pressable
          style={styleNoteEdit.iconButton}
          onPress={() => {
            action1();
          }}
        >
          <NoteIcon width={30} height={30} />
        </Pressable>
      </Animated.View>
      <Pressable
        onPress={toggleButtons}
        style={[styleNoteEdit.buttonBackGround, styleNoteEdit.plusButton]}
      >
        <Text style={styleNoteEdit.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

export default NewNoteButton;
