import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
export default function Citas() {
  async function getCalendars(){
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );

      console.log("Here are all your calendars:");
      console.log({ calendars });
    }
  };
  async function getDefaultCalendarSource() {
    await Calendar.getCalendarsAsync().then((id) => console.log(id));
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar2" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar2",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      name: "taniagalindo887@gmail.com",
      ownerAccount: "taniagalindo887@gmail.com",
      source: {
        isLocalAccount: true,
        name: "taniagalindo887@gmail.com",
        type: "com.google",
      },
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }
  async function createEvent() {
    try {

      const newEvent = await Calendar.createEventAsync("1", {
        title: "TEST",
        startDate: new Date("2022-04-01"),
        endDate: new Date("2022-04-02"),
        organizerEmail: "taniagalindo887@gmail.com"
      });

      console.log(`Event was created., ${newEvent}`);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function createAttende() {
    try {
      await Calendar.createAttendeeAsync("72", {
        email: "20203tn155@utez.edu.mx",
        role: "attende",
        type: "optional",
        status: "accepted"
      });
      console.log("Invitado creado");
    } catch (error) {
      console.log(error.message);
    }
  }

  
  return (
    <View>
      <Button
        title={"Acceder a calendario"}
        onPress={getDefaultCalendarSource}
      />
      <Button title="Crear nuevo evento" onPress={createEvent} />
      <Button title={"Crear Calendario"} onPress={createCalendar} />
      <Button title={"Crear invitado"} onPress={createAttende}/>
    </View>
  );
}

const styles = StyleSheet.create({});
