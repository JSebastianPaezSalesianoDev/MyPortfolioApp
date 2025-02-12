import axios from "axios";
import asyncStorageGaleryService from "./async-galeryStorage";

const IP = "172.16.96.45";
const API_URL = "http://172.16.96.45:5000";

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
  height: number,
  width: number,
  encodedData: string | undefined
) => {
  const token = await asyncStorageGaleryService.getData(
    asyncStorageGaleryService.KEYS.userToken
  );

  if (token == null) {
    return null;
  }

  console.log(token);
  const response = await fetch(API_URL + "/images/save", {
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

  console.log(response);

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
