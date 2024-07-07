import MenuIcon from "./icons/MenuIcon";
import styleHeader from "@/app/style/styleHeader";
import { SafeAreaView, View } from "react-native";

const AppHeader = () => {
    return (
        <SafeAreaView style={styleHeader.header}>
            <MenuIcon width={32} height={32} style={styleHeader.icon} />
        </SafeAreaView>
    );
};

export default AppHeader;
