// startPage.tsx
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import asyncStorageGaleryService from "../services/async-galeryStorage";

const StartPage = () => {
  const redirectIfTokenExists = async () => {
    try {
      const token: string = await asyncStorageGaleryService.getData(
        asyncStorageGaleryService.KEYS.userToken
      );

      if (token) {
        router.replace("/welcomePage");
      } else {
        router.replace("/authUser/login");
      }
    } catch (error) {
      console.error("Error al verificar el token en StartPage:", error);
      router.replace("/authUser/login");
    }
  };

  useEffect(() => {
    redirectIfTokenExists();
  }, []);

  return null;
};

export default StartPage;
