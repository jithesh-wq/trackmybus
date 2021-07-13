import React, { useState,useEffect,useRef } from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Alert,Platform,PermissionsAndroid, ToastAndroid } from 'react-native'
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
    const [currentLocation, setCurrentLocation] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [clearRoute, setClearRoute] = useState(false)
    const prevLocation = usePrevious(currentLocation);
    useEffect(() => {
        const getUserId=async()=>{
            const user=await auth().currentUser
            setUserId(user.uid)
        }
        return () => {
            getUserId()
        }
    }, [])
    const getLocation = async () => {                   //get the location using gps
            Geolocation.watchPosition(
                (position) => { 
                    console.log("gettingLocation");
                    setCurrentLocation(position);
                    console.log(position)
                },
                (error) => {
                    console.log(`Code ${error.code}`, error.message);
                    setCurrentLocation(null);
                    console.log(error);
                },
                {
                    accuracy: {
                    android: 'high',
                    },
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 5000,
                    distanceFilter: 0,
                    forceRequestLocation: true,
                    forceLocationManager: true,
                    showLocationDialog: true,
                },
            );
            // GetLocation.getCurrentPosition({
            //         enableHighAccuracy: true,
            //         timeout: 15000,
            //         })
            //         .then(location => {
            //             console.log(location);
            //         })
            //         .catch(error => {
            //             const { code, message } = error;
            //             console.warn(code, message);
            //         })
            
    };
    function usePrevious(value) { 
        // The ref object is a generic container whose current property is mutable ...
        // ... and can hold any value, similar to an instance property on a class
        const ref = useRef();
        // Store current value in ref
        useEffect(() => {
            ref.current = value;
        }, [value]); // Only re-run if value changes
        // Return previous value (happens before update in useEffect above)
        return ref.current;
    }
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
      getLocation()
      setRunningStatus("Running")
      setIsTripCancelled(false)
      console.log(currentLocation)
    }
    const handleStop = () => {
      Geolocation.stopObserving();
      setRunningStatus("Stopped")
      setClearRoute(true)
    }
    const handleRouteSelection =async(value) => {           //set the current route as selected route
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
                                      //getRoutes related to this bus
       const subscribe = 
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
        setisLoading(false)
        return()=>{
            subscribe
        }
    }, [refresh])

    useEffect(() => {               //update bus status
       const updateBus=firestore()
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
        return()=>{
            updateBus
        }
    }, [runningStatus,isBreakDown,isInTraffic,isTripCancelled])

                                                     
    useEffect(() => {       //timer for refreshing user
       setTimeout(() => {
           setRefresh(refresh+1)
       }, 1000);
    }, [])
console.log(currentLocation)
    if(clearRoute){ //clear the currentroute from datatbase when ending the trip
        firestore()
        .collection('Currentroute')
        .doc(userId)
        .update({
            'currentRoute':"",
        })
        .then(() => {
            console.log('route updated!');
        });
    }
    
   
    useEffect(() => {  
        const updateLocationToDatabase = () => {
            firestore()
                .collection('CurrentLocation')
                .doc(userId)
                .set({
                    currentLocation:currentLocation,
                })
                .then(() => {
                    console.log('Location updated!');
                })
                .catch((e)=>console.log(e));
            }
        userId?updateLocationToDatabase():console.log("not authed")
    }, [currentLocation])
    const checkLocationChanges = () => {
    //   if(currentLocation.coords.latitude>(prevLocation.coords.latitude+0.001)||currentLocation.coords.longitude>(prevLocation.coords.longitude+0.001)){
    //       console.log("locations changes")
    //   }
    console.log("checking Location");
    }
    useEffect(() => {
        checkLocationChanges()
    }, [])
    if(isLoading && userId){
        return(<LoadingScreen/>)
    }
    console.log(currentLocation)
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
