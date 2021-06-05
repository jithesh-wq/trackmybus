import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'

const GettingStarted = () => {
    return (
        <View style={{flex:1}}>
        <View style={styles.imageContainer} >
        <Image
            style={styles.image}
            source={require('../assets/images/image2.png')}
        />
            <Text style={styles.quote}>Sometimes it's good to miss a bus,{"\n"}it might be a wrong bus</Text>

        </View>
        <View style={styles.textConatiner}>
            <Text style={styles.text}>
                Track my bus bus tracking app for easily finding the bus which u want withou wasting time,it helps you to manage time perfectly
            </Text>
            <Button text="Next" bgcolor="#F76C5E" textcolor="white"/>
        </View>
    </View>
    )
}

export default GettingStarted

const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        height:"65%",
        justifyContent:'center',
        alignItems:'center'
    },
    quote:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
    },
    text:{
        color:"white",
        fontSize:18,
        fontWeight:'500',
        textAlign:'center',
        padding:10,
        fontStyle:'italic'
    },
    textConatiner:{
        width:"100%",
        height:"35%",
        backgroundColor:"#39375B",
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        justifyContent:'center',
        alignItems:"center"
    }
})
