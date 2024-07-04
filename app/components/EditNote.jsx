import React, { useState, useEffect, useRef } from "react";
import { TextInput, View, Text } from "react-native";
import { getCurrentDate, dateToString } from "@/app/utils/dateTools";
import { storeData, getData } from "@/app/utils/storageTools";

const EditNote = () => {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [note, setNote] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      setTitle(dateToString(getCurrentDate()));
      const answer = await getData("note");
      if (answer) {
        setNote(answer);
        setContent(answer.content)
      }
    };

    fetchNote();
  }, []);

  const saveNote = async (c) => {
    const note = {
      title,
      content: c,
      lastedit: getCurrentDate(),
    };
    try {
      await storeData("note", note);
      const answer = await getData("note");
      setNote(answer);
    } catch (e) {
      // saving error
      console.error("Error storing data:", e);
    }
  };

  const onTextChange = (e) => {
    setContent(e);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveNote(e);
      timerRef.current = null;
    }, 500);
  };

  return (
    <View>
      <Text>{title}</Text>
      <TextInput
        onChangeText={onTextChange}
        placeholder={"Insert text here"}
        value={content}
      />
      <Text>Title: {title} </Text>
      <Text>{note?.content}</Text>
    </View>
  );
};

export default EditNote;
