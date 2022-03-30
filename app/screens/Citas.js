import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-elements";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
export default function Citas() {
  const getCalendars = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      console.log("Here are all your calendars:");
      //console.log({ calendars });
    }
  };
  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createEvent() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
    const newEvent = await Calendar.createEventAsync({
      title: "TEST",
      startDate : new Date(2022, 5, 1),
      endDate: new Date(2022, 5, 2),
    
    });
    const{startDate} = newEvent
    console.log(startDate)
    console.log("Event was created.");
  }

  return (
    <View>
      <Button title={"Acceder a calendario"} onPress={getCalendars} />
      <Button title="Crear nuevo evento" onPress={createEvent} />
    </View>
  );
}

const styles = StyleSheet.create({});
