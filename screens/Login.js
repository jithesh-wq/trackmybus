import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import Button from '../components/Button'
import InputField from '../components/InputField'
 
const Login = () => {
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
                <InputField label="Username" password={false}/>
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



