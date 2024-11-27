import { StyleSheet, Text, View, Modal, Button } from "react-native";
import React, { useState } from "react";
import StoreComponent from "../../components/StoreComponent";

export type PropsformAddProduct = {
  name: string;
  category: string;
  quantity: string;
  price: string;
  setIsModalVisible: (visible: boolean) => void;
};

const Store = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    categoria: "",
    cantidad: "",
    precio: "",
  });
  return (
    <View>
      <Text>My store</Text>
      <View style={styles.buttonAddProduct}>
        <Button
          title="Añadir Producto"
          onPress={() => setIsModalVisible(true)}
        ></Button>
        <Modal visible={isModalVisible} transparent={true}>
          <StoreComponent />
        </Modal>
      </View>
    </View>
  );
};

export default Store;

const styles = StyleSheet.create({
  buttonAddProduct: {
    backgroundColor: "red",
    width: "50%",
  },
  modalContainer: {
    justifyContent: "center",
    alignSelf: "center",
    verticalAlign: "middle",
    backgroundColor: "purple",
    width: "50%",
    height: "50%",
  },
});
