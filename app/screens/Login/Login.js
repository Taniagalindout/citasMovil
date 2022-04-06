import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Image, Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleButton from "react-google-button";
export default function Login(props) {
  //console.log("dentro del login", props);
  const { navigation, route } = props;
  const { setExistSession } = route.params;
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const handleGoogleSignin = async () => {

    setGoogleSubmitting(true);
    const config = {
      iosClientId: `201170760326-oj9j1b9ksm9c3knhlajr9a7aop59o2s3.apps.googleusercontent.com`,
      androidClientId: `201170760326-a800cf51te3o18cgfe2u8s9mnccvriin.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user} = result;
        if (type == "success") {
          storeData(user);
          setExistSession(true)
          console.log("Inicio de sesion correctamente");  
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
  const storeData = async (value) =>{
    try{
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@sigcita', jsonValue)
    }catch (e){
      console.log("Error en setItem");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/sigcita.png")}
        resizeMode="contain"
        style={styles.img}
      />
      <Text style={styles.title}>Sistema de Gestión de Portafolio Docente</Text>
      <Button
        title={"Iniciar sesión con Google"}
        onPress={handleGoogleSignin}
        icon={
          <Icon
            type="fontisto"
            name="google"
            color="#FF0000"
            style={styles.icon}
          />
        }
        buttonStyle={styles.btnbg}
        titleStyle={{color: "danger"}}
        type="outline"
        titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#FFF",
    flex: 1
  },
  img: {
    width: "100%",
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    marginLeft: 50
  },
  btnbg: {
    borderRadius: 3,
    marginLeft: 80,
    marginTop: 20,
    width: "50%",
  },
  icon: {
    marginRight: 10,
  },

});
