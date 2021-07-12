import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LocationInput from '../components/LocationInput';
import Button from "../components/Button"
import LoadingScreen from './LoadingScreen';
import firestore from '@react-native-firebase/firestore'

const LocationSelector =  ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [matchedBuses, setMatchedBuses] = useState([])
  const [locations, setLocations] = useState(["Cheruvathur","Chembrakanam"])
  const [data, setData] = useState([])
  const [checkBus, setCheckBus] = useState(0)
  const [counter, setCounter] = useState(0)
  useEffect(() => {
 const getData= firestore()
    .collection('Routes')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((documentSnapshot)=>{
        getAllRoutes(documentSnapshot)
      })
     });
    return ()=>{
      getData
    }
  }, [])
  // useEffect(() => {
  //   if(locations.lenght==0){
  //     ToastAndroid.showWithGravity(
  //     "Searching for Buses",
  //     ToastAndroid.SHORT,
  //     ToastAndroid.CENTER
  //   );
  //   }else{
  //     console.log(matchedBuses);
  //   }
  // }, [checkBus])
  const getAllRoutes =(documentSnapshot) => {
    console.log(documentSnapshot.data());
    setData((prev)=>[...prev,{
          busId:documentSnapshot.data().busId,
          busStops:documentSnapshot.data().busStops
        }])
  }
  const handleNext = ()=>{
    // setInterval(() => {
    //   setCheckBus(checkBus+1)
    // }, 1000);
      if(locations.length==2){
        data.forEach((routes)=>{
          console.log(routes.busId);
          console.log(locations);

        const route = routes.busStops
        const checker = locations.every(v => route.includes(v));
        if(checker){
          setMatchedBuses((prev)=>[...prev,routes.busId])
        }
    })  
        setTimeout(() => {
          console.log("matchedBuses =>:   "+matchedBuses);
        }, 2000);
        // navigation.navigate('BusSelector',{buses:matchedBuses})
        handleNavigation()
    }else{
      console.log("fieldEpmty");
    }
    setCounter(counter+1)
  }
  const handleNavigation = () => {
        if(matchedBuses.length<1){
            console.log("no bus Available");
            // if(counter<5){
            //   handleNext()
            // }
        }else{
            navigation.navigate('BusSelector',{buses:matchedBuses})
        }
    
  }
  const getCurrentLocation = (value) => {
        setLocations([])
        if(locations.length===0){
          setLocations((prev)=>[...prev,value])
        }
  }
  const getDesitnationLocation = (value) => {
        if(locations.lenght<2){
          setLocations((prev)=>[...prev,value])
        }
  }
  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }

  

  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={styles.logo}>
        <Text>TMBus</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Current Location</Text>
        <LocationInput  getText={(value)=>getCurrentLocation(value)}/>
        <Text style={styles.inputLabel}>Destination
        </Text>
        <LocationInput getText={(value)=>getDesitnationLocation(value)}/>
        <Text style={styles.suggestionText}>Select place from the suggestions</Text>
        <Text style={styles.suggestionText}>{matchedBuses}</Text>

        <Button text="Next" bgcolor="#F76C5E" textcolor="white" press={()=>handleNext()} />
      </View>
    </View>
  ) 
}

export default LocationSelector

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red"
  },
  suggestionText: {
    color: "green",
  }
})
