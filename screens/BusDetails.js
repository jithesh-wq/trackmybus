import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'

const BusDetails = () => {
    const test =()=>{
        console.log("fullscreen")
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.busDetailsContainer}>
                <View style={styles.busDetails}>
                    <Text style={styles.title}>Bus Details</Text>
                   <View style={styles.textContainer}>
                        <Text style={styles.status}>Bus Name : </Text>
                        <Text style={styles.status}>Tee Cee</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>Running : </Text>
                        <Text style={styles.status}>Yes</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>Breakdown : </Text>
                        <Text style={styles.status}>No</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>In Traffic : </Text>
                        <Text style={styles.status}>No</Text>
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
