import React from 'react'
import {  Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'

const Register = ({navigation}) => {
    const handleLogin = ()=>{
        navigation.navigate("Login")
    }
    const handleSignup = ()=>{
        navigation.navigate("Signup")
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.imageContainer} >
            <Image
                style={styles.image}
                source={require('../assets/images/image2.png')}
            />
                <Text style={styles.quote}>Sometimes it's good to miss a bus,{"\n"}it might be a wrong bus</Text>

            </View>
            <View style={styles.buttonContainer}>
                <Button text="Login" bgcolor="#F76C5E" textcolor="white" press={handleLogin}/>
                <Button text="Signup" bgcolor="white" textcolor="#F76C5E" press={handleSignup}/>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        height:"80%",
        justifyContent:'center',
        alignItems:'center'
    },
    quote:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    },
    buttonContainer:{
        width:"100%",
        height:"20%",
        backgroundColor:"#39375B",
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        justifyContent:'space-around',
        alignItems:"center",
        flexDirection:'row'
    }
})
