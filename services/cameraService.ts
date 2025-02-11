// cameraService.ts
import asyncStorageGaleryService from "./async-galeryStorage";
import { Alert } from "react-native";
import axios from "axios";
// colegio :172.16.96.45
// casa: 192.168.1.130

const API_URL = "http://192.168.1.130:5000";
export interface ImageItem {
  id: string;
  encodedData: string;
  width: number;
  height: number;
}

export const getAllImages = async (): Promise<ImageItem[]> => {
  try {
    const token = await asyncStorageGaleryService.getData(
      asyncStorageGaleryService.KEYS.userToken
    );
    console.log("Token recuperado en getAllImages:", token);

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await axios.get(`${API_URL}/images/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Respuesta del servidor (getAllImages):", response.data);

    if (!response.data || !response.data.images) {
      throw new Error("Respuesta inválida del servidor");
    }

    return response.data.images;
  } catch (error) {
    console.error("Error obteniendo imágenes:", error);
    Alert.alert("Error", "No se pudieron obtener las imágenes.");
    return [];
  }
};

export const saveImage = async (
  imageBase64: string,
  width: number,
  height: number
): Promise<any> => {
  try {
    const token = await asyncStorageGaleryService.getData(
      asyncStorageGaleryService.KEYS.userToken
    );
    console.log("Token recuperado en saveImage:", token);
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const body = {
      width,
      height,
      encodedData: imageBase64,
    };

    console.log("Cuerpo de la petición (saveImage):", body);

    const response = await axios.post(`${API_URL}/images/save`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Respuesta del servidor (saveImage):", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    Alert.alert("Error", "Error al guardar la imagen.");
    throw error;
  }
};

const cameraService = { getAllImages, saveImage };

export default cameraService;
