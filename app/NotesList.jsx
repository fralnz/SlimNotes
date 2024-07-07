import { getAllKeys } from "./utils/storageTools"; // Ensure this returns a promise
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const NotesList = () => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      const keysArray = await getAllKeys();
      setKeys(keysArray);
    };

    fetchKeys();
  }, []);

  return (
    <View>
      {keys ? (
        keys.map((key, index) => <Text key={index}>{key}</Text>)
      ) : (
        <Text>No notes found</Text>
      )}
    </View>
  );
};

export default NotesList;
