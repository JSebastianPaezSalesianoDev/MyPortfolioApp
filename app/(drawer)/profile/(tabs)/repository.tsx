import { StyleSheet, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";

const repository = () => {
  return (
    <View style={styles.centerQRCode}>
      <QRCode value="https://github.com/JSebastianPaezSalesianoDev" />
    </View>
  );
};

const styles = StyleSheet.create({
  centerQRCode: {
    flex: 1,
    margin: 50,
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    paddingLeft: 85,
  },
});

export default repository;
