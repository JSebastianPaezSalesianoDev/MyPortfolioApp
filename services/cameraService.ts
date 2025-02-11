import axios from "axios";

const IP = "192.168.1.102";

// 172.16.98.164

const getAllPictures = async (token: string | unknown) => {
  const response = await axios.get("http://" + IP + ":5000/images/get-all", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.data.object;

  if (response.status == 409) {
    return null;
  }

  return json;
};

const savePicture = async (
  token: string | unknown,
  height: number,
  width: number,
  encodedData: string | undefined
) => {
  const response = await fetch("http://" + IP + ":5000/images/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      height: height,
      width: width,
      encodedData: encodedData,
    }),
  });

  if (response.status == 400 || response.status == 401) {
    return null;
  }

  return response.json();
};

const PictureService = {
  getAllPictures,
  savePicture,
};
export default PictureService;
