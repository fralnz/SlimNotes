import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import moment from 'moment';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const currentDate = moment().format('DD-MM-YYYY');
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(notes));
    } catch (e) {
      // saving error
    }
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setNotes(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

  useEffect(() => {
    readData();
  }, []);

  const handleAddNote = () => {
    setNotes([...notes, input]);
    setInput("");
  };

  const handleClearNotes = () => {
    setNotes([]);
  };

  useEffect(() => {
    saveData();
  }, [notes]);

  return (
    <View>
      <TextInput
        onChangeText={setInput}
        placeholder={"Insert note title"}
        value={input}
      />
      <Button onPress={handleAddNote} title="Add Note" />
      <Button
        onPress={() => {
          handleClearNotes();
          clearAll();
        }}
        title="Clear Notes"
      />
      {notes.map((note, index) => (
        <Button
          key={index}
          title={note}
          onPress={() =>
            router.push({ pathname: "/note", params: { title: note } })
          }
        />
      ))}
      <Button key={currentDate} title={"Daily note"} onPress={() =>
          router.push({ pathname: "/note", params: { title: currentDate } })
      }/>
      <Button title={"Calendar"} onPress={() =>
          router.push({ pathname: "/cal" })
      }/>
      <Text>{currentDate}</Text>
    </View>
  );
};

export default App;