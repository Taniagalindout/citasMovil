import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import * as Calendar from "expo-calendar";
export default function Citas() {
  //Permisos para acceder a Google calendar
  async function getCalendars() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync();
      Calendar.EntityTypes.EVENT;
      console.log("Here are all your calendars:");
      console.log({ calendars });
    }
  }

  async function getAndroidCal() {
    var androidCalendar;
    var foundCal = false;
    var androidCalendars = await Calendar.getCalendarsAsync();
    for (var x = 0; x < androidCalendars.length; x++) {
      if (androidCalendars[x]["source"]["type"] == "com.google") {
        foundCal = true;
        androidCalendar = androidCalendars[x]["id"];
        var nombre = "Tania"
        const newEvent = await Calendar.createEventAsync(androidCalendar, {
          title: "Revision de portafolio con organizador",
          startDate: new Date("2022-04-01"),
          endDate: new Date("2022-04-02"),
          accessLevel: "public",
          organizerEmail: "20203tn155@utez.edu.mx",
        });
        console.log(`Event was created., ${newEvent}`);
        const resppuesta = await Calendar.createAttendeeAsync(`${newEvent}`, {
          email: "taniagalindo887@gmail.com",
          role: "attende",
          type: "required",
          status: "accepted",
        });
        console.log("Invitado creado");
        break;
      }
    }
    return androidCalendar;
  }

 (
    <View>
  
¿      <Button title={"Crear evento"} onPress={getAndroidCal} />
    </View>
  );
}

const styles = StyleSheet.create({});
