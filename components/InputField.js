import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputField = (props) => {
    const [text, setText] = useState('');
    return (
        <View style={styles.inputContainer}>
            <Text style={{color:props.color,fontSize:15,marginBottom:8,marginLeft:20}}>{props.label}</Text>
            <TextInput 
                style={styles.inputBox}
                secureTextEntry={props.password}
                onChangeText={text=>{
                    setText(text)
                    props.getText(text)
                }}
                value={text}
             />
        </View>
    )
}

export default InputField

const styles = StyleSheet.create({
    inputBox:{
      height:55,
      width:380,
      borderWidth:1,
      borderColor:'grey',
      paddingLeft:20,
      marginBottom:10,
      borderRadius:35,
      fontSize:17,
      backgroundColor:"white",
      color:"black",
    }
})
