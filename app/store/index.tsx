import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Image, // Importa Image
} from "react-native";
import { Product } from "../types/Product";
import { productArray } from "../../data/productsArray";
import StoreComponent from "../../components/addProductStore";

export const TodoPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(productArray);

  const handleAddProduct = (newProduct: Product) => {
    if (isEditMode && selectedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === selectedProduct.id ? newProduct : prod
        )
      );
    } else {
      setProducts([...products, newProduct]);
    }
    setIsModalVisible(false);
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text>{`Categoría: ${product.category}`}</Text>
            <Text>{`Cantidad: ${product.quantity}`}</Text>
            <Text>{`Precio por unidad: $${product.unitPrice}`}</Text>
            {product.image && (
              <Image source={product.image} style={styles.productImage} />
            )}
            <View style={styles.buttonGroup}>
              <Button
                title="Editar"
                onPress={() => handleEditProduct(product)}
                color="#ffa500"
              />
              <Button
                title="Eliminar"
                onPress={() =>
                  setProducts((prevProducts) =>
                    prevProducts.filter((prod) => prod.id !== product.id)
                  )
                }
                color="red"
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Button
        title="Añadir Producto"
        onPress={() => {
          setIsModalVisible(true);
          setIsEditMode(false);
        }}
      />
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <StoreComponent
            setIsModalVisible={setIsModalVisible}
            isEditProduct={isEditMode}
            productName={selectedProduct?.name || ""}
            product={selectedProduct}
            onAddProduct={handleAddProduct}
          />
        </View>
      </Modal>
    </View>
  );
};

export default TodoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
