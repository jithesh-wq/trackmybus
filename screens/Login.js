import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import InputField from '../components/InputField'
 
const Login = () => {
    return (
        <View style={{flex:1}}>
            <View style={styles.imageContainer} >
                
            </View>
            <View style={styles.inputConatiner}>
                <InputField label="Userna me" password={false}/>
                <InputField label="Password" password={true}/>
                <Button text="Login" bgcolor="#F76C5E" textcolor="white"/>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        height:"65%",
    },
    inputConatiner:{
        width:"100%",
        height:"35%",
        backgroundColor:"blue",
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        justifyContent:'center',
        alignItems:"center"
    }
})
