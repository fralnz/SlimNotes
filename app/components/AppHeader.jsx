import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import CalendarIcon from "@/app/components/icons/CalendarIcon";
import { router } from "expo-router";
import { ListIcon } from "@/app/components/icons/ListIcon";
import { CheckIcon } from "@/app/components/icons/CheckIcon";
import { SyncIcon } from "@/app/components/icons/SyncIcon";
import { useNoteContext } from "@/app/hooks/notes.hook";

const AppHeader = () => {
  const { saved, savedEnabled } = useNoteContext();
  return (
    <SafeAreaView style={styleHeader.header}>
      {/* Left side of the header */}
      <View style={styleHeader.headerView}>
        <Pressable
          onPress={() => {
            router.navigate("/NotesList");
          }}
        >
          <ListIcon width={32} height={32} style={styleHeader.icon} />
        </Pressable>
        <Pressable
          onPress={() => {
            router.navigate("/Calendar");
          }}
        >
          <CalendarIcon width={32} height={32} style={styleHeader.icon} />
        </Pressable>
      </View>
      {/* Right side of the header */}
      <View style={styleHeader.headerView}>
        {savedEnabled && (
          <Pressable style={{ marginRight: 16 }}>
            {saved ? <CheckIcon /> : <SyncIcon />}
          </Pressable>
        )}
        <Pressable onPress={() => router.navigate("/Settings")}>
          <MenuIcon width={32} height={32} style={styleHeader.icon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
