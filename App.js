import React,{useEffect, useState} from "react";
import "react-native-gesture-handler";
import LoginStack from "./app/navigation/LoginStack";
import Navigation from "./app/navigation/Navigation";
import * as Google from 'expo-google-app-auth'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [existSession, setExistSession] = useState(false)

  useEffect(() =>{
    (async() =>{
      console.log("si entro al effect");
      //aqui va la obtención con async storage
      const getData = async () =>{
        try{
          const savedDates = await AsyncStorage.getItem('@sigcita');
          console.log(savedDates);
          if (savedDates == null) throw new Error("Error2")
          else return savedDates
        }catch(err){
          console.log("Error", err);
        }
      }
      getData();
    })();
  },[existSession])

  return existSession ? <Navigation /> : <LoginStack setExistSession={setExistSession} />
}
