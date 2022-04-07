import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Icon } from "react-native-elements";
import * as Calendar from "expo-calendar";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import { isEmpty, min, set } from "lodash";
import Modal from "../../util/Modal";
import { useNavigation } from "@react-navigation/native";
export default function Citas(props) {
  const navigation = useNavigation()
  const [modal, setModal]= useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
      }
    })();
  }, []);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selDate, setSelDate] = useState("");
  const [date, setDate] = useState();
  const [text, setText] = useState("Empty");
  const [formData, setFormData] = useState({
    name: "",
    emailadmin: "",
  });
  const [error, setError] = useState({ name: "", emailadmin: "" });
  const [primaryCalendar, setPrimaryCalendar] = useState("");
  const change = (event, type) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };
  const onChangeDate = (event, selectDate) => {
    const currentDate = selectDate || new Date();
    setShow(Platform.OS === "ios");
    let formatDate = new Date(selectDate);
    let da =
      formatDate.getDate() < 10
        ? "0" + formatDate.getDate()
        : formatDate.getDate();
    let mo =
      formatDate.getMonth() + 1 < 10
        ? "0" + (formatDate.getMonth() + 1)
        : formatDate.getMonth() + 1;
    let ye = formatDate.getFullYear();
    setDate(ye + "-" + mo + "-" + da);
    setText(da + "-" + mo + "-" + ye);
  };
  const onChangeTme = (event, time) => {
    setShow(Platform.OS === "ios");
    console.log("time: ", time);
    let formatDate = new Date(time);
    let hour =
      formatDate.getHours() < 10
        ? "0" + formatDate.getHours() + ":"
        : formatDate.getHours + ":"();
    let minute =
      formatDate.getMinutes() < 10
        ? "0" + formatDate.getMinutes()
        : formatDate.getMinutes();
    setDate((it) => it + "T" + hour + minute);
    setText((it) => it + " " + hour + minute);
    setModal(true)
    closeOverlay()

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    Calendar.getCalendarsAsync().then((calendars) => {
      calendars.map((item) => {
        if (item.accessLevel === "owner" && item.id !== "1") {
          setPrimaryCalendar(item.id);
          console.log(item.id);
          return;
        }
      });
    });
    // var androidCalendars = await Calendar.getCalendarsAsync();
    // for (var x = 0; x < androidCalendars.length; x++) {
    //   console.log(androidCalendars[x]);
    //   if (androidCalendars[x]["accessLevel"] == "owner" && ["id"] !=="1") {
    //     setPrimaryCalendar(androidCalendars[x]["id"]);
    //     console.log(androidCalendars[x]["id"]);
    //     break;
    //   }
    // }
  }, []);
  const closeOverlay = () => {
    setModal(false)
  }

  async function getAndroidCal() {
    console.log(typeof date);
    let stDate = new Date(date);
    let stDateF = new Date(stDate);
    stDateF.setMinutes(stDate.getMinutes() + 15);
    console.log("First", stDate);
    console.log("Second", stDateF);
    console.log("PrimaryCalendar", primaryCalendar);
    const event = await Calendar.createEventAsync(primaryCalendar, {
      title: "Revision de portafolio " + formData.name,
      startDate: stDate,
      endDate: stDateF,
      accessLevel: "public",
    });
    console.log(`Evento creado ${event}`);
      const attendes = await Calendar.createAttendeeAsync(`${event}`, {
        email: formData.emailadmin,
        role: "attende",
        type: "required",
        status: "accepted",
      });
      getEvents(event, date.split("T")[0]);
      console.log("Invitado creado", attendes);
  }
  async function getEvents(id, f) {
    try {
      const event = await Calendar.getEventAsync(id, f);
      console.log(event);
    } catch (error) {
      console.log("Error para obtrener los eventos", error);
    }
  }


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
          onChange={(event) => change(event, "name")}
          errorMessage={error.name}
        />
        <Input
          placeholder="email@utez.edu.mx"
          rightIcon={
            <Icon
              type="material-community"
              name="email"
              size={20}
              color="#094670"
            />
          }
          label="Correo electronico del administrador: *"
          onChange={(event) => change(event, "emailadmin")}
          errorMessage={error.emailadmin}
        />
        <Text>Cita para revisión de portafolio docente: </Text>
        <Text>Fecha y hora: </Text>
        <Text>{text}</Text>
        <Button
          title={"Seleccionar fecha"}
          onPress={() => showMode("date")}
          style={{ marginTop: 20 }}
          icon={{
            name:"calendar",
            type:"material-community",
            size:20,
            color:"#FFF",
          }
        }
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: "#009574",
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        />
        <Button
          title={"Seleccionar hora"}
          onPress={() => showMode("time")}
          style={{ marginTop: 20 }}
          icon={{
            name:"clock-outline",
            type:"material-community",
            size:20,
            color:"#FFF",
          }
              
        }
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: "#009574",
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
          marginBottom: 10
        }}
        />
      </Card>
      {show && (
        <DateTimePickerAndroid
          value={new Date()}
          testID="datetimePicker"
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={mode === "date" ? onChangeDate : onChangeTme}
        />
      )}

      <Button title={"Crear evento"} onPress={getAndroidCal} 
         icon={{
           name:"calendar",
           type:"material-community",
           size:20,
           color:"#FFF",
         }
       }
       iconContainerStyle={{ marginRight: 10 }}
       titleStyle={{ fontWeight: '700' }}
       buttonStyle={{
         backgroundColor: "#094670",
         borderColor: 'transparent',
         borderWidth: 0,
         borderRadius: 30,

       }}
       containerStyle={{
         width: 200,
         marginTop: 30
      
       }}
      />
      
      <Modal isVisible={modal} text = "Creando evento en Google Calendar"/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center"
  },
});
