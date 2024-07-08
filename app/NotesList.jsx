import { getAllKeys } from "./utils/storageTools"; // Ensure this returns a promise
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { transformDate } from "./utils/dateTools";
import CustomSwitch from "react-native-custom-switch-new";
import styleAndroid from "./style/styleAndroid";
import styleNotesList from "./style/styleNotesList";

const NotesList = () => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      const keysArray = await getAllKeys();
      setKeys(sortDates(keysArray));
    };

    fetchKeys();
  }, []);

  function sortDates(arr) {
    // Filter out non-date elements and convert valid dates to Date objects
    const validDates = arr.filter((dateStr) => {
      // Use a regex pattern to match YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        // Try creating a Date object from the string
        const dateObj = new Date(dateStr);
        // Check if the Date object is valid
        return !isNaN(dateObj.getTime());
      }
      return false;
    });

    // Sort the Date objects
    validDates.sort((dateStr1, dateStr2) => {
      const date1 = new Date(dateStr1);
      const date2 = new Date(dateStr2);
      return date1 - date2;
    });

    // Return sorted date strings in YYYY-MM-DD format
    return validDates;
  }

  return (
    <SafeAreaView
      style={[styleAndroid.droidSafeArea, styleNotesList.notesPage]}
    >
      <CustomSwitch
        switchLeftText={"Daily Notes"}
        switchLeftTextStyle={{
          color: "black",
          fontSize: 16,
          fontWeight: 600,
        }}
        switchRightText={"Custom Notes"}
        switchRightTextStyle={{ color: "white", fontSize: 16, fontWeight: 600 }}
        buttonWidth={40}
        switchWidth={200}
        buttonPadding={2}
        switchBackgroundColor={"#0070F2"}
        onSwitchBackgroundColor={"#EAECEF"}
      />
      {keys ? (
        keys.map((key, index) => (
          <Text key={index}>{transformDate(key, "DD-MM-YYYY")}</Text>
        ))
      ) : (
        <Text>No notes found</Text>
      )}
    </SafeAreaView>
  );
};

export default NotesList;
