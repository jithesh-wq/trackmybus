import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'

const UserPicker = () => {
    const [selectedValue, setSelectedValue] = useState()
    return (
        <View style={{flex:1}}>
        <View style={styles.imageContainer} >
        
        <Image
            style={styles.image}
            source={require('../assets/images/image2.png')}
        />
            <Text style={styles.quote}>Sometimes it's good to miss a bus,{"\n"}it might be a wrong bus</Text>
        </View>
        <View style={styles.inputConatiner}>
            <Text style={styles.question}>Who are you..?</Text>
            <View style={styles.optionContainer}>
                <Button text="Driver" bgcolor="#F76C5E" textcolor="white"/>
                <Button text="Passenger" bgcolor="white" textcolor="#F76C5E"/>
            </View>
        </View>
    </View>
    )
}

export default UserPicker

const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        height:"75%",
        justifyContent:'center',
        alignItems:'center'
    },
    quote:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
    },
    inputConatiner:{
        width:"100%",
        height:"25%",
        backgroundColor:"#39375B",
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        justifyContent:'center',
        alignItems:"center"
    },
    optionContainer:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    question:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        color:"white",
        padding:10
        
    }
    
})
