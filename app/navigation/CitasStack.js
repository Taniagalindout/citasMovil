import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CitasConfirm from "../screens/Citas/CitasConfirm";
const Stack = createStackNavigator();
export default function CitasStack() {
  return (
      <Stack.Navigator
      initialRouteName="citasConfirm"
      initialRouteName="loginStack"
        screenOptions={{
          headerStyle: { backgroundColor: "#094670" },
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        <Stack.Screen 
        name="citasConfirm"
        component={CitasConfirm}
        />
      </Stack.Navigator>
 
  );
}

const styles = StyleSheet.create({});
