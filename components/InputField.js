import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputField = (props) => {
   
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{props.label}</Text>
            <TextInput 
                style={styles.inputBox}
                secureTextEntry={props.password}
             />
        </View>
    )
}

export default InputField

const styles = StyleSheet.create({
    inputContainer:{
        // width:"100%"
    },
    inputLabel:{
        fontSize:17,
        color:"white",
        marginBottom:5
    },
    inputBox:{
      height:55,
      width:370,
      
      paddingLeft:20,
      marginBottom:10,
      borderRadius:35,
      fontSize:17,
      backgroundColor:"white",
      color:"black",
    }
})
