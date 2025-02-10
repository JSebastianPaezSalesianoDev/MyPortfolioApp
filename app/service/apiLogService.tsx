import { router } from "expo-router";
import { asyncStorageService } from "./async-storage";
import { Alert } from "react-native";

const ip: string = "172.16.96.45";
const registerUser = async (
  email: string,
  username: string,
  password: string
): Promise<String | null> => {
  const response = await fetch("http://" + ip + ":5000/auth/register", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    //{ "Content-Type": "application/json" },
    body: JSON.stringify({ fullname: username, email: email, pswd: password }),
  });
  console.log(await response.json());
  if (response.status == 201) {
    router.navigate("authUser/login");

    return response.status.toString();
  }

  if (response.status == 409) {
    return response.status.toString();
  }
  if (response.status == 400) {
    return response.status.toString();
  }

  return response.status.toString();
};

const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("http://" + ip + ":5000/auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, pswd: password }),
    });

    const data = await response.json();

    if (response.status === 200 || response.ok) {
      const token = data.object.token;
      console.log("Token recibido del backend DENTRO de apiLogService:", token);

      if (token) {
        await asyncStorageService.save(
          asyncStorageService.KEYS.userToken,
          token
        ); // Save ONLY the token
        Alert.alert("Login exitoso");
        return token;
      } else {
        console.error("Token not found in backend response data:", data);
        return null;
      }
    } else {
      console.error("Login failed - HTTP status:", response.status, data);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

export const apiLogService = { registerUser, loginUser };
