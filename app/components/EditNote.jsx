import React, { useState, useEffect, useRef } from "react";
import { TextInput, View, Text, PanResponder } from "react-native";
import {
  getCurrentDate,
  dateToString,
  transformDate,
  checkIfDate,
  getPreviousDay,
  getNextDay,
} from "@/app/utils/dateTools";
import { storeData, getData } from "@/app/utils/storageTools";
import styleNoteEditor from "../style/styleNoteEditor";
import AppHeader from "@/app/components/AppHeader";
import { useNoteContext } from "@/app/hooks/notes.hook";
import { useGlobalSearchParams, useRouter } from "expo-router";

const EditNote = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(null);
  const timerRef = useRef(null);
  const { setSaved, savedEnabled } = useNoteContext();
  const { dateFormat } = useNoteContext();
  const [noteKey, setNoteKey] = useState(dateToString(getCurrentDate()));
  const noteKeyRef = useRef(noteKey); // Add this line
  const params = useGlobalSearchParams();
  const key = Array.isArray(params.key) ? params.key[0] : params.key;
  const router = useRouter();

  const MIN_SWIPE_DISTANCE = 10;

  useEffect(() => {
    if (key) setNoteKey(key);
  }, [key]);

  useEffect(() => {
    noteKeyRef.current = noteKey; // Add this line
    console.log("notekey", noteKey);
    const fetchNote = async () => {
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
      setSaved(true);
      timerRef.current = null;
    }, 500);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Logic to detect swipe direction
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (!checkIfDate(noteKeyRef.current)) {
        } else if (gestureState.dy > MIN_SWIPE_DISTANCE) {
          console.log("Swiped down");
          console.log("NK", noteKeyRef.current); // Change this line
          const prevDay = getPreviousDay(noteKeyRef.current); // Change this line
          router.setParams({ key: prevDay });
        } else if (gestureState.dy < -MIN_SWIPE_DISTANCE) {
          console.log("Swiped up");
          console.log("NK", noteKeyRef.current); // Change this line
          const nextDay = getNextDay(noteKeyRef.current); // Change this line
          router.setParams({ key: nextDay });
        }
      },
    }),
  ).current;

  return (
    <View style={[styleNoteEditor.noteContainer, { flex: 1 }]}>
      <AppHeader />
      <View {...panResponder.panHandlers}>
        <Text style={styleNoteEditor.noteTitle}>{title}</Text>
      </View>
      <View style={{ flex: 1, width: "100%", paddingHorizontal: 10 }}>
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
  );
};

export default EditNote;
