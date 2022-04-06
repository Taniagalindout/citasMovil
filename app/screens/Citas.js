import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Icon } from "react-native-elements";
import * as Calendar from "expo-calendar";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";

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
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selDate,setSelDate] = useState('')
  const [date, setDate]
  const onChange = (event, selectedDate) => {
    setSelDate(`${newDate.getFullYear()}-0${newDate.getMonth()}-0${newDate.getDay()}`)
    console.log("Fecha selDate"+ selDate);

  };

  async function getAndroidCal() {
    console.log("mi textyo", selDate);
    var androidCalendar;
    var foundCal = false;
    var androidCalendars = await Calendar.getCalendarsAsync();
    for (var x = 0; x < androidCalendars.length; x++) {
      if (androidCalendars[x]["source"]["type"] == "com.google") {
        foundCal = true;
        androidCalendar = androidCalendars[x]["id"];
        var nombre = " Erick Mireles Merchant";
        const newEvent = await Calendar.createEventAsync(androidCalendar, {
          title: "Revision de portafolio " + nombre,
          startDate: new Date(selDate),
          endDate: new Date(selDate),
          accessLevel: "public",
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

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Input
          placeholder="Erick Mireles Merchant"
          rightIcon={
            <Icon
              type="material-community"
              name="account"
              size={20}
              color="#094670"
            />
          }
          label="Nombre del docente: *"
        />
        <Input
          placeholder="email@utez.edu.mx"
          rightIcon={
            <Icon
              type="material-community"
              name="account"
              size={20}
              color="#094670"
            />
          }
          label="Correo electronico del administrador: *"
        />
        
        <Text>{setSelDate}</Text>
        <Button
          title={"Seleccionar fecha"}
          onPress={() => showMode("date")}
          style={{ marginTop: 20 }}
        />
      </Card>

      {show && (
        <DateTimePickerAndroid
          value={date}
          testID="datetimePicker"
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Button title={"Crear evento"} onPress={getAndroidCal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
