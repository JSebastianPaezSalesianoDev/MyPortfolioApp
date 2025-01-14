import { StyleSheet, Text, View, Image, Button } from "react-native";

import { useState } from "react";
import { ImageProps } from "react-native";

export const dogsPage = () => {
  const [dogImage, setDogImage] = useState<ImageProps>(
    require("../../assets/category/pan.jpeg")
  );
  const [fact, setFact] = useState<string>("Nothing to show yet");
  const getDogFact = async () => {
    try {
      const response = await fetch("https://dog-api.kinduff.com/api/facts");
      const data = await response.json();
      console.log(data);
      setFact(data.fact);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Image source={dogImage} />
      <Text>{fact}</Text>
      <Button
        title="buscar un nuevo facto"
        onPress={() => {
          getDogFact();
        }}
      />
    </View>
  );
};

export default dogsPage;

const styles = StyleSheet.create({});
