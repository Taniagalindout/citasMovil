import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import ApiCalendar from "react-google-calendar-api";
export default function Login() {
  const handleClick = (event, name) => {
    if (name === "sign-in") {
      ApiCalendar.handleAuthClick()
        .then(() => {
          console.log("sign in succesful!");
        })
        .catch((e) => {
          console.error(`sign in failed ${e}`);
        });
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
    }
  };
  return (
    <View>
      <Button
        title={"Iniciar sesión"}
        onPress={(e) => handleClick(e, "sign-in")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
