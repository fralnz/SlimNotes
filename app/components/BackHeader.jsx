import { Pressable, View } from "react-native";
import styleHeader from "../style/styleHeader";
import BackIcon from "./icons/BackIcon";
import React from "react";
import { router } from "expo-router";
import ToastConfig from "../utils/Toast";
import Toast from "react-native-toast-message";

const BackHeader = () => (
  <View style={styleHeader.header}>
    <Pressable onPress={() => router.push("/")}>
      <BackIcon width={32} height={32} />
    </Pressable>
  </View>
);

export default BackHeader;
