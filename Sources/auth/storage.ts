// storage.native.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeItem = async (key: string, value: string) => {
  console.log('Storing:', key, value);
  await AsyncStorage.setItem(key, value);
};

const getItem = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export { storeItem, getItem };