  import { Link } from "expo-router";
  import { router } from "expo-router";
  import React, { useState } from "react";
  import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import { apiLogService } from "../service/apiLogService";
  import ToastManager, { Toast } from "toastify-react-native";

  const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    /*   const handleRegister = () => {
      alert("Redirigiendo a la página de registro...");
    };
  */
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const isValidPassword = (password: string) => {
      const hasUpperCase = /[A-Z]/.test(password);
      return password.length >= 5 && hasUpperCase;
    };

    const handleRegister = async () => {
      if (!isValidEmail(email)) {
        Toast.warn("Please enter a valid email address");
        return;
      }

      if (!isValidPassword(password)) {
        Toast.warn("Pw must be > 5 letters");
        return;
      }

      try {
        const responseStatus = await apiLogService.registerUser(
          email,
          username,
          password
        );
        if (responseStatus == "200" || responseStatus == "201") {
          Toast.success("Registration successful");
          router.navigate("authUser/login");
        }
        Toast.success("Registration successful");
      } catch (error: any) {
        Toast.error("Registration failed: " + error.message);
      }
    };

    return (
      <GestureHandlerRootView style={styles.container}>
        <ToastManager
          position="top"
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          width={"auto"}
        />
        ;<Text style={styles.title}>Registro</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/../authUser/login"
            style={styles.link}
            onPress={handleRegister}
          >
            Ingresar
          </Link>
        </Text>
      </GestureHandlerRootView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      width: "100%",
      backgroundColor: "#fff",
    },
    button: {
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    registerText: {
      marginTop: 15,
      fontSize: 14,
      color: "#555",
    },
    link: {
      color: "#007BFF",
      textDecorationLine: "underline",
    },
  });

  export default Register;
