import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Button = (props) => {
    return (
        <View style={
            { width:150,
            height:50,
            backgroundColor:props.bgcolor,
            borderRadius:35,
            justifyContent:'center',
            alignItems:'center'
            }
            }
            >
            <Text style={{
                color:props.textcolor,
                fontSize:20,
                fontWeight:"bold"


            }}>{props.text}</Text>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
  
})
