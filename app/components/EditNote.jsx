import React, { useState, useEffect, useRef } from "react";
import { TextInput, View, Text } from "react-native";
import { getCurrentDate, dateToString } from "@/app/utils/dateTools";
import { storeData, getData } from "@/app/utils/storageTools";
import styleNoteEditor from "../style/styleNoteEditor";

const EditNote = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(null);
  const [note, setNote] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      setTitle(dateToString(getCurrentDate()));
      const answer = await getData("note");
      if (answer) {
        setNote(answer);
        setContent(answer.content);
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
    <View style={styleNoteEditor.noteContainer}>
      <Text style={styleNoteEditor.noteTitle}>{title}</Text>
      <Text>Title: {title} </Text>
      <Text style={{ fontFamily: "Adamina-Regular" }}>
        Saved content: {note?.content}
      </Text>
      <TextInput
        onChangeText={onTextChange}
        placeholder={"Insert text here"}
        value={content}
        multiline={true}
      />
    </View>
  );
};

export default EditNote;
