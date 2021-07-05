import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import Button from '../components/Button'
import InputField from '../components/InputField'
import LoadingScreen from './LoadingScreen'
import auth from '@react-native-firebase/auth';
 
const Login = ({navigation}) => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const getUserName = (value) => {
          setUserName(value)
        }
        const getPassword = (value) => {
          setPassword(value)
        }
        const handleLogin = () => {
            setIsLoading(true)
            if(userName && password){
                auth()
                .signInWithEmailAndPassword(userName, password)
                .then(() => {
                    console.log('Logged in!');
                    navigation.navigate("DriverDetails")
                })
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        console.log('UserNotFOund');
                    }
                    if(error.code==='auth/wrong-password'){
                        console.log("wrong password")
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }
                        console.error(error);
            });
            }else{
                console.log("Empty Fields");
            }
           
            setIsLoading(false)
        }
        useEffect(() => {
            const currentUser = auth.currentUser;
            if(currentUser){
                navigation.navigate("DriverDetails")
                setIsLoading(false)
            }
        }, [])
        if(isLoading){
            return(
                <LoadingScreen/>
            )
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
                <InputField label="Username" password={false} color="white" getText={value=>getUserName(value)}/>
                <InputField label="Password" password={true} color="white" getText={value=>getPassword(value)}/>
                <Button text="Login" bgcolor="#F76C5E" textcolor="white" press={handleLogin}/>
            </View>
        </View>
    )
}

export default Login

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



