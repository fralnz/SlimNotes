import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import EditNote from "./components/EditNote";
import { useLocalSearchParams } from "expo-router"; // Import useLocalSearchParams from expo-router
import AppHeader from "@/app/components/AppHeader";
import styleAndroid from "@/app/style/styleAndroid";
import { getCurrentDate, dateToString } from "@/app/utils/dateTools"; // Import date functions

const HomeScreen = () => {
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

  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <AppHeader />
      <EditNote noteKey={selectedDate} />
    </SafeAreaView>
  );
};

export default HomeScreen;
