import { Alert } from "react-native";
import axios from "axios";

const API_URL = "http://172.16.96.45:5000";

export interface ImageItem {
  id: string;
  encodedData: string;
  width: number;
  height: number;
}

export const getAllImages = async (token: string): Promise<ImageItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/images/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  token: string,
  base64: string,
  width: number,
  height: number
) => {
  try {
    const response = await axios.post(
      `${API_URL}/images/save`,
      { width, height, encodedData: base64 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data) {
      throw new Error("No se recibió respuesta válida del servidor");
    }

    return response.data;
  } catch (error) {
    console.error("Error guardando imagen:", error);
    Alert.alert("Error", "No se pudo guardar la imagen en la API");
    return null;
  }
};

export const deleteImage = async (token: string, imageId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/images/${imageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data) {
      throw new Error("No se recibió confirmación de eliminación");
    }

    return response.data;
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    Alert.alert("Error", "No se pudo eliminar la imagen.");
    return null;
  }
};
