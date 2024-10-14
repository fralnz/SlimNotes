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

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
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

export const removeAll = async () => {
  const keys = await getAllKeys();
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
  }

  console.log("Removed all keys");
};

export const exportAllData = async () => {
  const data = [];
  const keys = await getAllKeys();
  for (const key of keys) {
    const value = await getData(key);
    const obj = { key: key, value: value };
    data.push(obj);
  }
  // console.log(data);
  console.log("Data exported");
  return data;
};

export const importData = async (data) => {
  for (const obj of data) {
    const { key, value } = obj;
    await storeData(key, value);
  }
  console.log("Data imported");
};
