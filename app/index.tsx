import React from "react";
import { Redirect } from "expo-router";

const startPage = () => {
  return <Redirect href="authUser/Login" />; // dogs, //welcomePage
};

export default startPage;
