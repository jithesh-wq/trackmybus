import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import InputField from '../components/InputField'
const Signup = () => {
    const test =()=>{
        console.log("signup")
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
                <InputField label="Username" password={false}/>
                <InputField label="Password" password={true}/>
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
