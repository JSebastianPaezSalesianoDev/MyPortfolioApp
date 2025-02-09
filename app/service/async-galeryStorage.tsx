import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  userToken: "user-token",
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(KEYS.userToken);
    return token;
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
    return null;
  }
};

export const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.userToken, token);
  } catch (error) {
    console.error("Error saving token to AsyncStorage:", error);
  }
};
