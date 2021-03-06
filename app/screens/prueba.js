async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }
  async function createEventsCalendar(){
    if(Platform === "ios"){
      getDefaultCalendarSource()
      const newEvent = await Calendar.createEventAsync(getDefaultCalendarSource, {
        title: "Prueba",
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
    }else{
      var androidCalendar;
      var foundCal = false;
      var androidCalendars = await Calendar.getCalendarsAsync();
      for (var x = 0; x < androidCalendars.length; x++) {
        if (androidCalendars[x]["source"]["type"] == "com.google") {
          foundCal = true;
          androidCalendar = androidCalendars[x]["id"];
          const newEvent = await Calendar.createEventAsync(androidCalendar, {
            title: "Prueba",
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
  }
  async function createCalendar() {
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "20203tn155@utez.edu.mx",
      color: "blue",
      isVisible: true,
      isPrimary: false,
      isSynced: true,
      allowedReminders: ["alarm", "alert", "email"],
      name: "20203tn155@utez.edu.mx",
      ownerAccount: "20203tn155@utez.edu.mx",
      source: {
        isLocalAccount: true,
        name: "20203tn155@utez.edu.mx",
      },
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }
  async function createEvent() {
    const newEvent = await Calendar.createEventAsync("5", {
      title: "TEST2",
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
      await Calendar.deleteCalendarAsync("2", {});
      console.log("Calendario eliminado");
    } catch (error) {
      console.log("Error al eliminar calendario", error);
    }
  }
  async function getEvents() {
    try {
      const event = await Calendar.getEventAsync("250", "2022-04-01");
      console.log(event);
    } catch (error) {
      console.log("Error para obtrener los eventos", error);
    }
  }
  return