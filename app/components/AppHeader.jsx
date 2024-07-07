import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import { Pressable, SafeAreaView, View } from "react-native";
import CalendarIcon from "@/app/components/icons/CalendarIcon";

const AppHeader = () => {
  return (
    <SafeAreaView style={styleHeader.header}>
      {/* Left side of the header */}
      <View>
        <CalendarIcon width={32} height={32} />
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
