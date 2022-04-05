import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-elements";
import * as Google from "expo-google-app-auth";

export default function Logout(props) {
  const {googleSubmitting, setGoogleSubmitting} = props

  const handleLogoutPress = async () => {
  await Google.logOutAsync(setGoogleSubmitting)
  };
  return <Button title={"Cerrando sesion"} onPress={handleLogoutPress} />;
}

const styles = StyleSheet.create({});
