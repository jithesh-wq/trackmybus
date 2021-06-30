import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputField = (props) => {
   
    return (
        <View style={styles.inputContainer}>
            <Text style={{color:props.color,fontSize:15,marginBottom:8,marginLeft:20}}>{props.label}</Text>
            <TextInput 
                style={styles.inputBox}
                secureTextEntry={props.password}
             />
        </View>
    )
}

export default InputField

const styles = StyleSheet.create({
    inputBox:{
      height:55,
      width:370,
      borderWidth:1,
      paddingLeft:20,
      marginBottom:10,
      borderRadius:35,
      fontSize:17,
      backgroundColor:"white",
      color:"black",
    }
})
