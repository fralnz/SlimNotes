import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import { Pressable, SafeAreaView } from "react-native";
import CalendarIcon from "@/app/components/icons/CalendarIcon";

const AppHeader = () => {
  return (
    <SafeAreaView style={styleHeader.header}>
      <CalendarIcon width={32} height={32} />
      <Pressable onPress={() => alert("pippa")}>
        <MenuIcon width={32} height={32} style={styleHeader.icon} />
      </Pressable>
    </SafeAreaView>
  );
};

export default AppHeader;
