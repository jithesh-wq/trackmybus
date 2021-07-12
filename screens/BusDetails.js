import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import firestore from '@react-native-firebase/firestore'
const BusDetails = ({route}) => {
    const test =()=>{
        console.log("fullscreen")
        console.log(route.params.busId);
    }
    const [bus, setBus] = useState();
useEffect(() => {
           firestore()
           .collection('Buses')
           .doc(route.params.busId)
           .get()
           .then((documentSnapshot)=>{
               setBus(documentSnapshot.data())
           })
   }, [])
console.log(bus)
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.busDetailsContainer}>
                <View style={styles.busDetails}>
                    <Text style={styles.title}>Bus Details</Text>
                   <View style={styles.textContainer}>
                        <Text style={styles.status}>Bus Name :</Text>
                        <Text style={styles.status}>{bus.busName} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>Running : </Text>
                        <Text style={styles.status}>{bus.currentStatus} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>Breakdown : </Text>
                        <Text style={styles.status}>{bus.isBreackDown?"No":"Yes"} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>In Traffic : </Text>
                        <Text style={styles.status}>{bus.isInTraffic?"Yes":"No"} </Text>
                    </View>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <Button text="full screen" bgcolor="#F76C5E" textcolor="white" press={test}/>
                <View style={styles.mapView}>

                </View>
            </View>
        </View>
    )
}

export default BusDetails

const styles = StyleSheet.create({
    busDetailsContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    mapContainer:{
        flex:1.5,
        alignItems:'center'
    },
    busDetails:{
        width:350,
        height:250,
        backgroundColor:'#39375B',
        borderRadius:20,
    },
    title:{
        fontSize:18,
        color:"white",
        fontWeight:"bold",
        alignSelf:'center',
        padding:10,
        textDecorationLine:'underline',
        paddingBottom:15
    },
    textContainer:{
        flexDirection:'row',
        padding:10
    },
    status:{
        fontSize:16,
        color:"white",
        fontWeight:'bold'
    },
    mapView:{
        backgroundColor:"#39375B",
        height:"100%",
        width:"100%",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        marginTop:10
    }
})
