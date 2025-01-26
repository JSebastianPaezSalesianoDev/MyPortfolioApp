import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastManager, { Toast } from "toastify-react-native";
import { apiLogService } from "../service/apiLogService";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    return password.length >= 5 && hasUpperCase;
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Toast.warn("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      Toast.warn("Password must be > 5 letters and have an uppercase letter");
      return;
    }

    try {
      const token = await apiLogService.loginUser(email, password);

      if (token == null) {
        Toast.warn("Login failed");
      } else {
        Toast.success("Login successful");
        router.navigate("../welcomePage");
      }
    } catch (error) {
      Toast.error("Login failed");
    }
  };

  const handleRegister = () => {
    Toast.warn("Redirigiendo a la página de registro...");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <ToastManager
        position="top"
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        width={"auto"}
      />
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{" "}
        <Link
          href="../authUser/register"
          style={styles.link}
          onPress={handleRegister}
        >
          Registrarse
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

export default Login;
