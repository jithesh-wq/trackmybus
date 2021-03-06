import React from 'react'
import { StyleSheet, Text,  TouchableOpacity } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity
            onPress={props.press}
            style={
                {
                    width: 140,
                    height: 45,
                    backgroundColor: props.bgcolor,
                    borderRadius: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    elevation:5

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



