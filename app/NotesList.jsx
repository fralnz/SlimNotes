import { getAllKeys } from "./utils/storageTools"; // Ensure this returns a promise
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { transformDate } from "./utils/dateTools";

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
    <View>
      {keys ? (
        keys.map((key, index) => (
          <Text key={index}>{transformDate(key, "DD-MM-YYYY")}</Text>
        ))
      ) : (
        <Text>No notes found</Text>
      )}
    </View>
  );
};

export default NotesList;
