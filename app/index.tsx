import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const startPage = () => {
  return <Redirect href="/welcomePage" />;
};

export default startPage;
