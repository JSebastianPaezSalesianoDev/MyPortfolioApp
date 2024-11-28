import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import uuid from "react-native-uuid";
import { Product } from "../app/types/Product";

type StoreComponentProps = {
  setIsModalVisible: (visible: boolean) => void;
  isEditProduct: boolean;
  productName?: string;
  product?: Product | null;
  onAddProduct: (newProduct: Product) => void;
};

const StoreComponent = (props: StoreComponentProps) => {
  const [name, setName] = useState(props.product?.name || "");
  const [category, setCategory] = useState(
    props.product?.category || "Panadería"
  );
  const [quantity, setQuantity] = useState(
    props.product?.quantity?.toString() || ""
  );
  const [price, setPrice] = useState(
    props.product?.unitPrice?.toString() || ""
  );

  const handleSaveProduct = () => {
    if (!name || !quantity || !price) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const newProduct: Product = {
      id: props.product?.id || uuid.v4().toString(),
      name,
      category,
      quantity: parseInt(quantity),
      unitPrice: parseFloat(price),
      image: getImageByCategory(category),
      inCart: false,
    };

    props.onAddProduct(newProduct);
    props.setIsModalVisible(false);
  };
  const getImageByCategory = (category: String): String => {
    switch (category) {
      case "Panadería":
        return require("../assets/category/pan.jpeg");
      case "Bebidas":
        return require("../assets/category/bebidas.jpeg");
      case "Enlatados":
        return require("../assets/category/enlatados.png");
      case "Carnes":
        return require("../assets/category/carne.jpeg");
      case "Pescados":
        return require("../assets/category/pescado.jpg");
      case "Frutas/Verduras":
        return require("../assets/category/frutas.png");
      case "Otros":
      default:
        return require("../assets/category/calvo.jpg");
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>
        {props.isEditProduct ? "Editar Producto" : "Añadir Producto"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Panadería" value="Panadería" />
          <Picker.Item label="Bebidas" value="Bebidas" />
          <Picker.Item label="Enlatados" value="Enlatados" />
          <Picker.Item label="Carnes" value="Carnes" />
          <Picker.Item label="Pescados" value="Pescados" />
          <Picker.Item label="Frutas/Verduras" value="Frutas/Verduras" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio por Unidad"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button
        title={props.isEditProduct ? "Guardar Cambios" : "Añadir Producto"}
        onPress={handleSaveProduct}
      />
      <Button
        title="Cancelar"
        color="red"
        onPress={() => props.setIsModalVisible(false)}
      />
    </View>
  );
};

export default StoreComponent;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
