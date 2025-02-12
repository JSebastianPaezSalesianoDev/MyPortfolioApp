// loginService.ts
import { router } from "expo-router";
import asyncStorageGaleryService from "./async-galeryStorage";
import axios from "axios";

const ip = "192.168.1.130";
const logIn = async (email: string, pswd: string): Promise<string | null> => {
  try {
    const response = await axios.post("http://" + ip + ":5000/auth/login/", {
      email,
      pswd,
    });
    if (response.status === 200 || response.status === 201) {
      await asyncStorageGaleryService.storeData(
        asyncStorageGaleryService.KEYS.userToken,
        response.data.object.token
      );

      return response.data.object.token as string;
    }
  } catch (error) {
    console.error("Error en logIn:", error);
  }
  return null;
};

const register = async (form: {
  fullname: string;
  email: string;
  pswd: string;
}) => {
  axios
    .post("http://" + ip + ":5000/auth/register/", form)
    .then((response) => {
      console.log("Respuesta de registro exitosa:", response);
      console.log("Data de registro:", response.data);
    })
    .catch((error) => {
      console.error("Error al enviar datos de registro:", error);
    });
};

const loginService = { logIn, register };

export default loginService;
