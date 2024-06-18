import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import styles from "./style";

const Note = () => {
  const { title } = useLocalSearchParams();
  const key = title;
  const [storedValue, setStoredValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef(null); // Ref to store timeout ID

  const inputRef = useRef(null);

  const [fontsLoaded] = useFonts({
    "Adamina-Regular": require("../assets/fonts/Adamina-Regular.ttf"),
  });

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setStoredValue(value); // Update state after storing data
    } catch (e) {
      // saving error
      console.error("Error storing data:", e);
    }
  };

  const getMyStringValue = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStoredValue(value); // Update state with fetched value
        setInputValue(value); // Set input value with fetched value
      }
    } catch (e) {
      // read error
      console.error("Error reading data:", e);
    }
  };

  useEffect(() => {
    getMyStringValue(); // Fetch data when component mounts
  }, []);

  const handleInputChange = (value) => {
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear existing timeout if input changes
    }

    timeoutRef.current = setTimeout(() => {
      storeData(value);
    }, 500); // Store data after 1 second of inactivity
  };

  if (!fontsLoaded) {
    return null;
  }

  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.noteTitle}>{title}</Text>
        <Text>Stored Value: {storedValue}</Text>
        <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
          <TextInput
              ref={inputRef} // Add this line to attach the ref
              onChangeText={handleInputChange}
              value={inputValue}
              multiline={true}
              placeholder="Tap to edit..."
              style={{...styles.input, flex: 1}} // Add flex: 1 to make the TextInput take up the remaining space
          />
        </TouchableWithoutFeedback>
      </View>
  );
};

export default Note;
