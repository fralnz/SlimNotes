import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import EditNote from "./components/EditNote";
import { useLocalSearchParams } from "expo-router";
import styleAndroid from "@/app/style/styleAndroid";
import { getCurrentDate, dateToString } from "@/app/utils/dateTools";
import Toast from "react-native-toast-message";
import ToastConfig from "@/app/utils/Toast";
import useBackHandler from "@/app/hooks/useBackHandler";
import { useNoteContext } from "@/app/hooks/notes.hook";
import {getData, storeData} from "@/app/utils/storageTools";

const HomeScreen = () => {
  const { setSavedEnabled } = useNoteContext();

  const [selectedDate, setSelectedDate] = useState(
    dateToString(getCurrentDate()),
  ); // Initialize with current date
  const params = useLocalSearchParams(); // Use useLocalSearchParams to get the params
  const key = Array.isArray(params.key) ? params.key[0] : params.key; // Handle the case where key might be an array

  useEffect(() => {
    if (key) {
      setSelectedDate(key);
    }
  }, [key]);

  useBackHandler(); // Use the custom hook

  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <ToastConfig />
      <Toast />
      <EditNote noteKey={selectedDate} />
    </SafeAreaView>
  );
};

export default HomeScreen;
