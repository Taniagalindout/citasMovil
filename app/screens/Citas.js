import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
export default function Citas() {
  var result;
  async function getCalendars() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync();
      Calendar.EntityTypes.EVENT;
      console.log("Here are all your calendars:");
      console.log({ calendars });
    }
  }

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    var newCalendarID = await Calendar.createCalendarAsync({
      title: "CalendarioGoogle2",
      color: "blue",
      isVisible: true,
      isPrimary: false,
      isSynced: true,
      name: "taniagalindo887@gmail.com",
      ownerAccount: "taniagalindo887@gmail.com",
      source: {
        isLocalAccount: false,
        name: "taniagalindo887@gmail.com",
        type: "com.google",
      },
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    result= newCalendarID;
    // result = parseInt(newCalendarID) +1;
    result.toString();
    console.log(result);
  }

  async function createEvent() {
    try {
      const newEvent = await Calendar.createEventAsync("2", {
        title: "TEST",
        startDate: new Date("2022-04-01"),
        endDate: new Date("2022-04-02"),
        accessLevel: "public",
        organizerEmail: "taniagalindo887@gmail.com",
      });
      console.log(`Event was created., ${newEvent}`);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function createAttende() {
    try {
      await Calendar.createAttendeeAsync("387", {
        email: "20203tn155@utez.edu.mx",
        role: "attende",
        type: "required",
        status: "accepted",
      });
      console.log("Invitado creado");
    } catch (error) {
      console.log(error.message);
    }
  }
  async function deleteCalendars() {
    try {
      await Calendar.deleteCalendarAsync("3", {});
      console.log("Calendario eliminado");
    } catch (error) {
      console.log("Error al eliminar calendario", error);
    }
  }
  return (
    <View>
      <Button title={"Acceder a calendario"} onPress={getCalendars} />
      <Button title="Crear nuevo evento" onPress={createEvent} />
      <Button title={"Crear Calendario"} onPress={createCalendar} />
      <Button title={"Crear invitado"} onPress={createAttende} />
      <Button title={"Eliminar Calendario"} onPress={deleteCalendars} />
    </View>
  );
}

const styles = StyleSheet.create({});
