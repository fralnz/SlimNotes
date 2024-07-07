import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import { Pressable, SafeAreaView, View } from "react-native";
import CalendarIcon from "@/app/components/icons/CalendarIcon";
import { router } from "expo-router";
import { ListIcon } from "@/app/components/icons/ListIcon";

const AppHeader = () => {
  return (
    <SafeAreaView style={styleHeader.header}>
      {/* Left side of the header */}
      <View style={styleHeader.headerView}>
        <Pressable
          onPress={() => {
            router.push("/NotesList");
          }}
        >
          <ListIcon width={32} height={32} style={styleHeader.icon} />
        </Pressable>
        <Pressable
          onPress={() => {
            router.push("/Calendar");
          }}
        >
          <CalendarIcon width={32} height={32} style={styleHeader.icon} />
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
