import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import CalendarIcon from "@/app/components/icons/CalendarIcon";
import { router } from "expo-router";
import { ListIcon } from "@/app/components/icons/ListIcon";
import { CheckIcon } from "@/app/components/icons/CheckIcon";
import { SyncIcon } from "@/app/components/icons/SyncIcon";

const AppHeader = ({status}) => {
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
      <View style={styleHeader.headerView}>
        <Pressable style={{marginRight:16}}>{status ? <CheckIcon /> : <SyncIcon />}</Pressable>
        <Pressable onPress={() => router.push("/Settings")}>
          <MenuIcon width={32} height={32} style={styleHeader.icon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
