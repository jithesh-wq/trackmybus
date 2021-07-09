import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Alert,Platform,PermissionsAndroid } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import Button from '../components/Button'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Geolocation from '@react-native-community/geolocation'
import LoadingScreen from './LoadingScreen'
const BusStatus = () => {
    const [textInput, setTextInput] = useState("");
    const [isBreakDown, setIsBreakDown] = useState(false)
    const [isInTraffic, setIsInTraffic] = useState(false)
    const [isTripCancelled, setIsTripCancelled] = useState(false)
    const [runningStatus, setRunningStatus] = useState("Stopped")
    const [allRoutes, setAllRoutes] = useState([])
    const [userId, setUserId] = useState()
    const [currentLocation, setCurrentLocation] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const hasLocationPermission = async () => {
   
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
    const handleBreakDown = () => {
      console.log("breakDown");
      setIsBreakDown(!isBreakDown)
    }
    const handleInTraffic = () => {
        console.log("in Traffic");
        setIsInTraffic(!isInTraffic)
    }
    const handleTripCancelled = () => {
        console.log("Trip Cancelled");
        setIsTripCancelled(!isTripCancelled)
        setRunningStatus("Stopped")
    }
    const handleStart =  () => {
      setRunningStatus("Running")
      setIsTripCancelled(false)
    }
    const handleStop = () => {
      setRunningStatus("Stopped")
    }
    const handleRouteSelection =async(value) => {
      setTextInput(value.label)
     const route= await firestore()
        .collection('Routes')
        .doc(value.key)
        .get();
      firestore()
        .collection('Buses')
        .doc(userId)
        .update({
            'currentRoute':route,
        })
        .then(() => {
            console.log('route updated!');
        });
    }
    useEffect(() => {
        setisLoading(true)
        setAllRoutes([])
        const currentUser=auth().currentUser
        setUserId(currentUser.uid)
        if(userId){
            firestore()
                .collection('Routes')
                .where('busId','==',userId)
                .get()
                .then(querySnapshot => {
                    setisLoading(false)
                    console.log('Total routes: ', querySnapshot.size);
                    querySnapshot.forEach(documentSnapshot => {
                    setAllRoutes(prevState=>[...prevState,{
                        key:documentSnapshot.id,
                        label:documentSnapshot.data().routeName
                    }])
                }); 
            })
            .catch((e)=>{console.log(e)});
        }else{
            console.log('notauthenticated');
        }
    }, [refresh])
    useEffect(() => {
        getLocation()
       firestore()
        .collection('Buses')
        .doc(userId)
        .update({
            'currentStatus':runningStatus,
            'isBreakDown':isBreakDown,
            'isInTraffic':isInTraffic,
            'isRouteCancelled':isTripCancelled
        })
        .then(() => {
            console.log('route updated!');
        })
        .catch((e)=>console.log(e));
    }, [runningStatus,isBreakDown,isInTraffic,isTripCancelled])
    useEffect(() => {
       setTimeout(() => {
           setRefresh(refresh+1)
       }, 1000);
    }, [])
    const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position);
        console.log(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setCurrentLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );
  };
    console.log(currentLocation)
    // setInterval(() => {
    //     console.log("testn")
    // }, 5000);
    if(isLoading && userId){
        return(<LoadingScreen/>)
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.routeContainer}>
                <View style={{marginTop:60}}>
                    <Text style={{color:"white",fontSize:15,marginBottom:8,marginLeft:20}}>Route Name</Text>
                    <ModalSelector
                    data={allRoutes}
                    onChange={(option)=>{ handleRouteSelection(option)}}>
                        <TextInput 
                            style={styles.inputBox}
                            editable={false}
                            value={textInput}  
                            placeholder="Select a route"
                            placeholderTextColor="grey"
                            onPress={()=>setRefresh(refresh+1)}
                        />
                    </ModalSelector>
                    <View style={{flexDirection:"row",justifyContent:'space-around'}}>
                        <Button bgcolor="white" textcolor="green" text="Start" press={handleStart}/>
                        <Button bgcolor="white" textcolor="red" text="Stop" press={handleStop}/>
                    </View>
                    <Text style={{alignSelf:'center',fontSize:15,color:"white",marginTop:10}}>Current Status : {runningStatus}</Text>
                </View>
            </View>
            <View style={styles.busStatusContainer}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Bus Status</Text>
                <TouchableOpacity
                    
                    style={
                            {
                                width: 140,
                                height: 45,
                                backgroundColor:isBreakDown?"#F76C5E":"white",
                                borderRadius: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderWidth:isBreakDown?0:0.1,
                                elevation:5

                            }
                    }
                    activeOpacity={0.7}
                    onPress={handleBreakDown}
                >
                <Text 
                    style={
                            {
                                color: isBreakDown?"white":"grey",
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                    }
                >
                Break Down
                </Text>
            </TouchableOpacity>
                <TouchableOpacity
                    
                    style={
                            {
                                width: 140,
                                height: 45,
                                backgroundColor:isInTraffic?"#F76C5E":"white",
                                borderRadius: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderWidth:isInTraffic?0:0.1,
                                elevation:5
                            }
                    }
                    activeOpacity={0.7}
                    onPress={handleInTraffic}
                >
                <Text 
                    style={
                            {
                                color:isInTraffic?"white":"grey",
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                    }
                >
                In TRaffic
                </Text>
            </TouchableOpacity>
                <TouchableOpacity
                    
                    style={
                            {
                                width: 140,
                                height: 45,
                                backgroundColor:isTripCancelled?"#F76C5E": "white",
                                borderRadius: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderWidth:isTripCancelled?0:0.1,
                                elevation:5

                            }
                    }
                    activeOpacity={0.7}
                    onPress={handleTripCancelled}
                >
                <Text 
                    style={
                            {
                                color:isTripCancelled?"white":"grey",
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                    }
                >
                Trip Cancelled
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default BusStatus

const styles = StyleSheet.create({
    routeContainer:{
        backgroundColor:"#39375B",
        flex:1,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        alignItems:'center',
        padding:10
    },
    busStatusContainer:{
        flex:1.5,
        alignItems:'center',
        justifyContent:'center'
    },
    inputBox:{
        height:55,
        width:380,
        borderWidth:1,
        borderColor:'grey',
        paddingLeft:20,
        marginBottom:10,
        borderRadius:35,
        fontSize:17,
        backgroundColor:"white",
        color:"black",
      }
})
