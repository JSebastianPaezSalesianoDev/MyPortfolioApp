import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Product } from "../../types/Product";

import StoreComponent from "../../../components/addProductStore";
import { productArray } from "../../../data/productsArray";

export const TodoPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(productArray);

  // aqui un useEffect que revise que no haya null en los tokens

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

  const handleClearProducts = () => {
    setProducts([]);
  };

  const totalPrice = products.reduce(
    (acc, product) =>
      product.inCart ? acc + product.quantity * product.unitPrice : acc,
    0
  );

  const toggleInCart = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === productId ? { ...prod, inCart: !prod.inCart } : prod
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {products.length === 0 ? (
          <Text style={styles.emptyMessage}>No hay productos en la cesta.</Text>
        ) : (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.cardContent}>
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text>{`Categoría: ${product.category}`}</Text>
                  <Text>{`Cantidad: ${product.quantity}`}</Text>
                  <Text>{`Precio por unidad: $${product.unitPrice}`}</Text>
                </View>
                {product.image && (
                  <Image source={product.image} style={styles.productImage} />
                )}
              </View>
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
                <TouchableOpacity onPress={() => toggleInCart(product.id)}>
                  <Text style={styles.cartIcon}>
                    {product.inCart ? "🛒 Quitar" : "🛒 Añadir"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      {products.some((product) => product.inCart) && (
        <Text style={styles.totalPrice}>
          Precio total de la cesta: ${totalPrice.toFixed(2)}
        </Text>
      )}
      {products.length > 0 && (
        <Button
          title="Borrar Todos"
          onPress={handleClearProducts}
          color="red"
        />
      )}
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
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cartIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#32cd32",
    textAlign: "center",
    paddingVertical: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
});
