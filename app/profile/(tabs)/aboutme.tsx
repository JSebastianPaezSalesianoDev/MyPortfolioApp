import { View, Text } from "react-native";
import React from "react";
import { cards } from "../../../data/AboutmeData";
import AboutMe from "../../../components/AboutmeComponent";
import { StyleSheet } from "react-native";

const Cards = () => {
  return (
    <View style={styles.flex}>
      <AboutMe aboutme={cards} />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default Cards;
