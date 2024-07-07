import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log("Done.");
};

export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem("@MyApp_key");
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  console.log(keys);
  return keys;
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};
