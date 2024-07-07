import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import {Pressable, SafeAreaView} from "react-native";

const AppHeader = () => {
  return (
    <SafeAreaView style={styleHeader.header}>
      <Pressable onPress={() => alert("pippa")}>
        <MenuIcon width={32} height={32} style={styleHeader.icon} />
      </Pressable>
    </SafeAreaView>
  );
};

export default AppHeader;
