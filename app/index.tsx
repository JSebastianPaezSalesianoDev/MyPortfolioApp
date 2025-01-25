import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { asyncStorageService } from "./service/async-storage";

const startPage = () => {
  const [userTokenData, setUserToken] = useState<string>("");

  useEffect(() => {
    const redirectIfTokenExists = async () => {
      let token = await asyncStorageService.get(
        asyncStorageService.KEYS.userToken
      );
      if (token != null) {
        router.navigate("/welcomePage");
      } else {
        router.navigate("authUser/login");
      }
    };
    redirectIfTokenExists();
  }, []);
  return null;
};

export default startPage;
