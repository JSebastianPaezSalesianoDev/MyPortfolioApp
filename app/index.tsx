// startPage.tsx
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import asyncStorageGaleryService from "../services/async-galeryStorage";

const StartPage = () => {
  const [userTokenData, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const redirectIfTokenExists = async () => {
      try {
        const token = await asyncStorageGaleryService.getData(
          asyncStorageGaleryService.KEYS.userToken
        );
        console.log("Token recuperado en StartPage:", token);

        if (token) {
          console.log("Token encontrado, navegando a welcomePage...");
          router.replace("/welcomePage");
        } else {
          console.log("Token NO encontrado, navegando a authUser/login...");
          router.replace("/authUser/login");
        }
      } catch (error) {
        console.error("Error al verificar el token en StartPage:", error);
        router.replace("/authUser/login");
      }
    };
    redirectIfTokenExists();
  }, []);

  return null;
};

export default StartPage;
