import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login/Login";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
export default function LoginStack(props) {
  const { setExistSession } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="loginStack"
        screenOptions={{
          headerStyle: { backgroundColor: "#094670" },
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        <Stack.Screen
          name="loginStack"
          component={Login}
          options={{ title: "Iniciar sesión" }}
          initialParams={{ setExistSession: setExistSession }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
