import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import InputField from '../components/InputField'
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const test =()=>{
        console.log("signup")
            auth()
            .createUserWithEmailAndPassword(userName, password)
            .then(() => {
                 console.log('User account created & signed in!');
                navigation.navigate("DriverDetails")
            })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }     
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
                });
            }
    const getUserName = (value) => {
    //   console.log(value)
      setUserName(value)
    }
    const getPassword = (value) => {
    //   console.log(value)
      setPassword(value)
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
            <View style={styles.inputConatiner}>
                <InputField label="Username" password={false} color="white" getText={(value)=>getUserName(value)}/>
                <InputField label="Password" password={true} color="white" getText={(value)=>getPassword(value)}/>
                <Button text="Signup" bgcolor="#F76C5E" textcolor="white" press={test}/>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        height:"60%",
        justifyContent:'center',
        alignItems:'center'
    },
    quote:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    },
    inputConatiner:{
        width:"100%",
        height:"40%",
        backgroundColor:"#39375B",
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        justifyContent:'center',
        alignItems:"center"
    }
})
