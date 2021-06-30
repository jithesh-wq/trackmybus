import React from 'react'
import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'

const OptionSelcetor = (props) => {
    return (
        <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionLabel}>{props.option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionLabel}>{props.option2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionLabel}>{props.option3}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OptionSelcetor

const styles = StyleSheet.create({
    optionsContainer:{
        width:300,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:"red",
        margin:10
    },
    optionButton:{
        width:80,
        height:40,
        borderRadius:20,
        backgroundColor:"blue",
        justifyContent:'center',
        alignItems:'center'
    },
    optionLabel:{
        color:"white",
        fontSize:15
    }
})
