// async-galeryStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    console.error("Error al eliminar el token:", error);
  }
};
