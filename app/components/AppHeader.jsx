import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import { Pressable, SafeAreaView, View } from "react-native";
import CalendarIcon from "@/app/components/icons/CalendarIcon";
import {router} from "expo-router";

const AppHeader = () => {
  return (
    <SafeAreaView style={styleHeader.header}>
      {/* Left side of the header */}
      <View>
        <Pressable onPress={() => {router.push("/Calendar")}}>
          <CalendarIcon width={32} height={32} />
        </Pressable>
      </View>
      {/* Right side of the header */}
      <View>
        <Pressable onPress={() => alert("pippa")}>
          <MenuIcon width={32} height={32} style={styleHeader.icon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
