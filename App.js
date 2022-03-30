import React,{useEffect, useState} from "react";
import "react-native-gesture-handler";
import LoginStack from "./app/navigation/LoginStack";
import Navigation from "./app/navigation/Navigation";
import * as Google from 'expo-google-app-auth'; 

export default function App() {
  const [existSession, setExistSession] = useState(false)
  const [reload, setReload] = useState()
  useEffect(() =>{
    console.log("si entro al effect");
    //aqui va la obtención con async storage
    setReload(false)
  },[reload])

  
  return existSession ? <Navigation /> : <LoginStack setReload={setReload} />
}
