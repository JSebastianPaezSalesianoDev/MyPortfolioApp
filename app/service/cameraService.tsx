import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorageGaleryService from "./async-galeryStorage";

const getUserImages = async (): Promise<string[]> => {
  try {
    // Obtener el token
    const token = await asyncStorageGaleryService.getData("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    // Hacer la solicitud GET a la API
    const response = await fetch(`http:192.168.1.130:5000/images/get-all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parsear la respuesta JSON
    const data = await response.json();
    console.log(data.object);

    if (Array.isArray(data.object)) {
      // Extraer el campo "encodedData" de cada imagen
      const images = data.object.map(
        (img: any) => `data:image/jpeg;base64,${img.encodedData}`
      );
      return images; // Devuelve un array de URLs de imágenes en base64
    } else {
      console.warn("La API no devolvió un array de imágenes:", data);
      return []; // Devuelve un array vacío
    }
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};

const saveImage = async (
  imageBase64: string,
  width: number,
  height: number
): Promise<any> => {
  try {
    // Obtener el token
    const token = await await asyncStorageGaleryService.getData("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    // Crear el cuerpo de la solicitud
    const body = {
      width,
      height,
      encodedData: imageBase64,
    };

    console.log(body);
    // Hacer la solicitud POST a la API
    const response = await fetch(`192.168.1.130:5000/images/save`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parsear la respuesta JSON
    const data = await response.json();
    return data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    throw error;
  }
};

const cameraService = { getUserImages, saveImage };

export default cameraService;
