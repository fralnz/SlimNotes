import React, { useState, useEffect, useRef } from "react";
import { TextInput, View, Text } from "react-native";
import {
  getCurrentDate,
  dateToString,
  transformDate,
  checkIfDate,
} from "@/app/utils/dateTools";
import { storeData, getData } from "@/app/utils/storageTools";
import styleNoteEditor from "../style/styleNoteEditor";
import AppHeader from "@/app/components/AppHeader";

const EditNote = ({ noteKey }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(noteKey);
  const [note, setNote] = useState(null);
  const [saved, setSaved] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      const dateFormat = await getData("@dateformat");
      if (checkIfDate(noteKey)) {
        setTitle(transformDate(noteKey, dateFormat));
      } else {
        setTitle(noteKey);
      }
      const answer = await getData(noteKey);
      if (answer) {
        setNote(answer);
        setContent(answer.content);
      } else {
        setNote("");
        setContent("");
      }
    };

    fetchNote();
  }, [noteKey]);

  const saveNote = async (c) => {
    const note = {
      title: noteKey,
      content: c,
      lastedit: getCurrentDate(),
    };
    try {
      await storeData(noteKey, note);
      const answer = await getData(noteKey);
      setNote(answer);
    } catch (e) {
      console.error("Error storing data:", e);
    }
  };

  const onTextChange = (e) => {
    setSaved(false);
    setContent(e);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveNote(e);
      timerRef.current = null;
      setSaved(true);
    }, 500);
  };

  return (
    <View>
      <AppHeader />
      <View style={[styleNoteEditor.noteContainer, { flex: 1, marginTop: 20 }]}>
        <Text style={styleNoteEditor.noteTitle}>{title}</Text>
        <Text>Title: {title} </Text>
        <Text style={{ fontFamily: "Adamina-Regular" }}>
          Saved content: {note?.content}
        </Text>
        <View style={{ flex: 1, width: "100%", paddingHorizontal: 10 }}>
          {JSON.stringify(saved)}
          <TextInput
            onChangeText={onTextChange}
            placeholder={"Insert text here"}
            value={content}
            multiline={true}
            style={{
              flex: 1,
              width: "100%",
              textAlignVertical: "top",
              fontFamily: "Adamina-Regular",
              fontSize: 16,
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EditNote;
