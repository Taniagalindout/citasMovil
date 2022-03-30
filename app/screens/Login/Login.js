import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Image, Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import Navigation from "../../navigation/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Login(props) {
  console.log("dentro del login",props);
  const { navigation, route} = props;
  const {setReload} = route.params
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `201170760326-oj9j1b9ksm9c3knhlajr9a7aop59o2s3.apps.googleusercontent.com`,
      androidClientId: `201170760326-a800cf51te3o18cgfe2u8s9mnccvriin.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == "success") {
          console.log("Inicio de sesion correctamente");
          console.log(result);
          console.log(user);
         
        } else {
          console.log("Inicio de sesión cancelado");
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        console.log("Ah ocurrido un error, revisa tu red");
        setGoogleSubmitting(false);
      });
  };

  return (
    <View>
      <Image
        source={require("../../../assets/sigcita.png")}
        resizeMode="contain"
        style={styles.img}
      />
      <Button
        title={"Iniciar sesión con Google"}
        onPress={handleGoogleSignin}
        icon={<Icon type="fontisto" name="google" color="#FFF" style={styles.icon} />}
        buttonStyle={styles.btnbg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  btnbg: {
    backgroundColor: "#009475",
    borderRadius: 3.84,
    marginLeft: 15,
    marginRight: 15
  },
  icon:{
    marginRight: 10
  }
});
