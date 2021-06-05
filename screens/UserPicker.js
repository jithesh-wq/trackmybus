import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import {Picker} from '@react-native-picker/picker';

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
            <View>
            <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
            />
            </View>
            <Button text="Next" bgcolor="#F76C5E" textcolor="white"/>
        </View>
    </View>
    )
}

export default UserPicker

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
        textAlign:'center',
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
