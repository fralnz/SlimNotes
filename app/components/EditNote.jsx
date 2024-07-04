import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text } from "react-native";
import { getCurrentDate, dateToString } from "@/app/utils/dateTools";

const EditNote = () => {
  const currentDate = getCurrentDate();
  const title = dateToString(currentDate);
  const [content, setContent] = useState("");

  return (
    <View>
      <Text>{title}</Text>
      <TextInput onChangeText={setContent} placeholder={"Insert text here"} value={content} />
        {content}
    </View>
  );
};

export default EditNote;
