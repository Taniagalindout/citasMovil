import React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import Citas from "../screens/Citas";
import Logout from "../screens/Logout";
import Login from "../screens/Login/Login";
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      initialRouteName="citas"
        screenOptions={{
          drawerActiveTintColor: "#094670",
          drawerInactiveTintColor: "gray",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: { backgroundColor: "#094670" },
        }}
      >
        <Drawer.Screen
          name="login"
          component={Login}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Icon
                type="material-community"
                name="arrow-right"
                size={16}
                color="#094670"
              />
            ),
            title: "Iniciar sesión",
          }}
        />
        <Drawer.Screen
          name="citas"
          component={Citas}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Icon
                type="material-community"
                name="book-outline"
                size={18}
                color="#094670"
              />
            ),
            title: "Agendar citas",
          }}
        />
        <Drawer.Screen
          name="logout"
          component={Logout}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Icon
                type="material-community"
                name="arrow-right"
                size={16}
                color="#094670"
              />
            ),
            title: "Salir",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
