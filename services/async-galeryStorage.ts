// async-galeryStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  userToken: "userToken",
};

const save = async (key: string, value: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error("Error en storeData:", e);
  }
  return false;
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error en getData:", e);
    return null;
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Clave "${key}" eliminada exitosamente.`);
  } catch (error) {
    console.error(`Error al eliminar la clave "${key}":`, error);
  }
};

const asyncStorageGaleryService = {
  storeData: save,
  getData,
  removeData,
  KEYS,
};

export default asyncStorageGaleryService;
