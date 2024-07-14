import React from "react";
import { SafeAreaView } from "react-native";
import EditNote from "./components/EditNote";
import styleAndroid from "@/app/style/styleAndroid";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styleAndroid.droidSafeArea}>
      <EditNote />
    </SafeAreaView>
  );
};

export default HomeScreen;
