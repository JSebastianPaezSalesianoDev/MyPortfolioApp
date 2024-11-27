import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Page() {
  const image = require("../assets/adf7ff14688846eb90770d4a284676fa.jpg");

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.spacer}></View>
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomingRow}>
            <Text style={styles.welcomeText}>Welcome to my page!</Text>
            <FontAwesome
              name="window-minimize"
              size={24}
              color="white"
              style={styles.windowMinimize}
            />
            <FontAwesome
              name="window-close-o"
              size={24}
              color="white"
              style={styles.windowClose}
            />
          </View>
          <View style={styles.pressmeBox}>
            <View style={styles.welcomeView}>
              <Link href="./profile">
                <Text>
                  <AntDesign name="caretright" size={15} color="black" />
                  Watch my repo!!
                  <AntDesign name="caretleft" size={15} color="black" />
                </Text>
              </Link>
            </View>
            <View style={styles.welcomeView}>
              <Link href="./todo">
                <AntDesign name="caretright" size={15} color="black" />
                iR AL TODO
                <AntDesign name="caretleft" size={15} color="black" />
              </Link>
            </View>
            <View style={styles.welcomeView}>
              {" "}
              <Link href="/store">
                {" "}
                <AntDesign name="caretright" size={15} color="black" /> IR A MI
                TIENDITA <AntDesign name="caretleft" size={15} color="black" />{" "}
              </Link>{" "}
            </View>
          </View>
        </View>
        <View style={styles.spacer}></View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 1,
    paddingTop: 1,
    height: 300,
    width: 300,
    borderRadius: 5,
  },
  welcomingRow: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    marginLeft: 10,
  },
  welcomeView: {
    backgroundColor: "#FFF",
    padding: 2,
    marginTop: 10,
    width: "75%",
    alignItems: "center",
  },
  windowMinimize: {
    marginRight: 9,
    marginTop: -7,
    marginLeft: 60,
  },
  windowClose: {
    marginRight: 8,
  },
  pressmeBox: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  todo: {
    color: "#fff",
    marginTop: 10,
    backgroundColor: "red",
  },
});
