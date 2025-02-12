import axios from "axios";
import asyncStorageGaleryService from "./async-galeryStorage";
import { Picture } from "../types/Picture";
import { ApiResponse } from "../types/ApiResponse";

const IP = "172.16.96.45";
const API_URL = "http://192.168.1.130:5000";

const getAllPictures = async (): Promise<Picture[]> => {
  const token = await asyncStorageGaleryService.getData(
    asyncStorageGaleryService.KEYS.userToken
  );
  console.log("token", token);

  if (token == null) {
    console.log("token is null");
    return [];
  }

  const response = await fetch(API_URL + "/images/get-all", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json: ApiResponse<Picture[]> = await response.json();
  console.log(json);

  if (json.statusCode == 409 || json.statusCode == 401) {
    return [];
  }

  return json.object;
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
