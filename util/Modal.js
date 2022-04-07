import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay } from "react-native-elements";
import { ActivityIndicator } from "react-native";

export default function Modal (props){
    const { isVisible, text } = props
    return (
        <Overlay
        isVisible={isVisible}
            windowsBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View>
                <ActivityIndicator size="large" color="#094670" />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles=StyleSheet.create({
    overlay:{
        height: 100,
        width: 200,
        backgroundColor: "#FFF",
        borderColor: "#009574",
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        color: "#094670",
        textTransform: "uppercase",
        marginTop: 10,
        textAlign: "center"
    }
})
