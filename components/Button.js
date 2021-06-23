import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity style={
            {
                width: 140,
                height: 45,
                backgroundColor: props.bgcolor,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
            }
        }
            activeOpacity={0.7}
        >
            <Text style={{
                color: props.textcolor,
                fontSize: 20,
                fontWeight: "bold"
            }}>{props.text}</Text>
        </TouchableOpacity>

    )
}

export default Button

const styles = StyleSheet.create({

})



