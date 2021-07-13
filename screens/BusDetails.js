import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import firestore from '@react-native-firebase/firestore'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import LoadingScreen from './LoadingScreen';
import busLogo from '../assets/icons/bus.png'

const BusDetails = ({route,navigation}) => {
    
    const [latitude, setLatitude] = useState("")
    const [location, setLocation] = useState({latitude:75,longitude:12})
    const [isLoading, setIsLoading] = useState(false)
    const [bus, setBus] = useState({
                   busName:"loading...",
                   running:"loading...",
                   isBreakDown:false,
                   inTraffic:false
               });
    const handleFullScreen =()=>{
        console.log("fullscreen")
        console.log(route.params.busId);
        navigation.navigate('FullScreenMap',{busId:route.params.busId})
    }
    console.log(route.params.busID)
    useEffect(() => {
    setIsLoading(true)
    const subscriber = firestore()
           .collection('Buses')
           .doc(route.params.busId)
           .get()
           .then((documentSnapshot)=>{
               console.log(documentSnapshot.data())
               setBus({
                   busName:documentSnapshot.data().busName,
                   currentStatus:documentSnapshot.data().currentStatus,
                   isBreakDown:documentSnapshot.data().isBreakDown,
                   inTraffic:documentSnapshot.data().isInTraffic
               })
           })
           .then(setIsLoading(false))
    return () => subscriber;
   }, [])
   useEffect(() => {
    const subscriber = firestore()
      .collection('CurrentLocation')
      .doc(route.params.busId)
      .onSnapshot(documentSnapshot => {
        setLocation({
            latitude:documentSnapshot.data().currentLocation.coords.latitude,
            longitude:documentSnapshot.data().currentLocation.coords.longitude
        })
      });
    return () => subscriber;
  }, []);
  
  if(isLoading){
      return(
          <LoadingScreen/>
      )
  }
  console.log(location);
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
                <Button text="full screen" bgcolor="#F76C5E" textcolor="white" press={handleFullScreen}/>
                <View style={styles.mapView}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: 12.22615,
                                longitude: 75.1977641,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        }}
                                image={busLogo}
                                   
                                ></Marker>
                               
                        </MapView>
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
    },
    map: {
   ...StyleSheet.absoluteFillObject,
 },
})
