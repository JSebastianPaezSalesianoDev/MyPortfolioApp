// loginService.ts
import { router } from "expo-router";
import asyncStorageGaleryService from "./async-galeryStorage";
import axios from "axios";

const ip = "192.168.1.130";
const logIn = async (form: { email: string; pswd: string }) => {
  try {
    const response = await axios.post(
      "http://" + ip + ":5000/auth/login/",
      form
    );
    if (response.status === 200 || response.status === 201) {
      await asyncStorageGaleryService.storeData(
        asyncStorageGaleryService.KEYS.userToken,
        response.data.object.token
      );
      console.log(
        "Token guardado en AsyncStorage:",
        response.data.object.token
      ); // Log para verificar
      console.log("Formulario de login:", form);
      return true;
    }
  } catch (error) {
    console.error("Error en logIn:", error);
    return false;
  }
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
