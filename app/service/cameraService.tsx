import { getToken } from "./async-galeryStorage";

const ip: string = "172.16.96.45";

export interface ImageItem {
  id: number;
  height: number;
  width: number;
  encodedData: string;
}

export const getAllImages = async (): Promise<ImageItem[] | null> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No user token found. Please log in.");
    }

    const response = await fetch(`http://${ip}:5000/images/get-All`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const data: ImageItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
};

export const save = async (
  height: number,
  width: number,
  encodeData: string | undefined
): Promise<ImageItem | null> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No user token found. Please log in.");
    }

    const response = await fetch(`http://${ip}:5000/images/save`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ height, width, data: encodeData }),
    });

    if (response.status === 409) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to save image: ${response.status}`);
    }

    const data: ImageItem = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving image:", error);
    return null;
  }
};
