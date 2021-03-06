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
                   currentStatus:"loading...",
                   isBreackDown:false,
                   isInTraffic:false,
                   isRouteCancelled:false,
                   serviceMode:"Loading..."
               });
    const handleFullScreen =()=>{
        console.log("fullscreen")
        console.log(route.params.busId);
        navigation.navigate('FullScreenMap',{busId:route.params.busId})
    }
    console.log(route.params.busID)
    useEffect(() => {
    const subscriber = firestore()
      .collection('CurrentLocation')
      .doc(route.params.busId)
      .onSnapshot(documentSnapshot => {
        getLocations(documentSnapshot)
      });
    return () => subscriber;
  }, []);
    useEffect(() => {
    const subscriber = firestore()
           .collection('Buses')
           .doc(route.params.busId)
           .onSnapshot((documentSnapshot)=>{
               console.log(documentSnapshot.data())
               getBus(documentSnapshot)
           });
    return () => subscriber;
   },[])
   
  const getLocations = (documentSnapshot) => {
    setLocation({
            latitude:documentSnapshot.data().currentLocation.coords.latitude,
            longitude:documentSnapshot.data().currentLocation.coords.longitude
        })
  }
  const getBus = (documentSnapshot) => {
    setBus({
                   busName:documentSnapshot.data().busName,
                   currentStatus:documentSnapshot.data().currentStatus,
                   isBreackDown:documentSnapshot.data().isBreackDown,
                   isInTraffic:documentSnapshot.data().isInTraffic,
                   serviceMode:documentSnapshot.data().serviceMode,

               })
    console.log("called getbus")
  }
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
                        <Text style={styles.status}>serviceMode : </Text>
                        <Text style={styles.status}>{bus.serviceMode} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>Running : </Text>
                        <Text style={styles.status}>{bus.currentStatus} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.status}>Breakdown : </Text>
                        <Text style={styles.status}>{bus.isBreackDown?"Yes":"No"} </Text>
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
                               latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        }}
                                   
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
        padding:8
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
