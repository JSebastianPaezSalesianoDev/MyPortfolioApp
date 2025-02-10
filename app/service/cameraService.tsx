import { Alert } from "react-native";

// cameraService.ts
const ip = "http://172.16.96.45:5000";

export interface ImageItem {
  id: string;
  encodedData: string;
  width: number;
  height: number;
}

export const getAllImages = async (token: string): Promise<ImageItem[]> => {
  try {
    const response = await fetch(`${ip}/images/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("HTTP error!", response.status);
      return [];
    }
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error("Error obteniendo imágenes:", error);
    return [];
  }
};

export const save = async (
  token: string,
  base64: string,
  width: number,
  height: number
) => {
  try {
    const requestBody = JSON.stringify({
      // 1. Mueve JSON.stringify a una variable
      width,
      height,
      encodedData: base64,
    });

    console.log("Cuerpo de la petición JSON (antes de fetch):", requestBody); // 2. LOG del requestBody <--- ¡CRUCIAL!

    const response = await fetch(`${ip}/images/save`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error al guardar la imagen: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Error al guardar la imagen: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error guardando imagen:", error);
    Alert.alert(
      // 4. Mensaje de error más específico en Alert (opcional)
      "Error al guardar imagen",
      "Ocurrió un error al guardar la imagen. Por favor, inténtalo de nuevo más tarde."
    );
    return null; // 5. Asegura que siempre se retorne null en catch
  }
};
