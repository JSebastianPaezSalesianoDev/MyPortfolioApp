import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export type HeaderProps = {
  title: string;
  myInfo: string;
  myRepo: string;
};

const HeaderComponent = (props: HeaderProps) => {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.firsttoprowContainer}>{props.title}</Text>
      <View style={styles.rowTopSecondContainer}>
        <Text style={[styles.buttonText, styles.shadoxboxing]}>
          {props.myInfo}
        </Text>

        <Text style={styles.buttonText}>{props.myRepo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: 100, // Cambia a un valor fijo para probar
    paddingTop: 50,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "blue",
    justifyContent: "flex-start",
    alignItems: "center", // Centra el contenido
  },

  firsttoprowContainer: {
    backgroundColor: "#E286E5",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  rowTopSecondContainer: {
    flexDirection: "row",
    backgroundColor: "#f4c5f3",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonruta: {
    width: "50%",
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  shadoxboxing: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
});

export default HeaderComponent;
