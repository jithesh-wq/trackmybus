import React, { useState } from 'react'
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
  const handleNext = ()=>{
    if(currentLocation!="" && destinationLocation!=""){
        setIsLoading(true)
        console.log(matchedBuses);
        navigation.navigate('BusSelector',{buses:matchedBuses})
    }else{
      console.log("fieldEpmty");
    }
  }
  const handleFilter = (value) => {
    console.log(`inside filter:${value}`);
    setMatchedBuses(prevArray=>[...prevArray,value])
  }
  console.log(matchedBuses)
  const getCurrentLocation = (value) => {
    setCurrentLocation(value)
  }
  const getDesitnationLocation = (value) => {
    setDestinationLocation(value)
    firestore()
        .collection('Routes')
        .where('busStops','array-contains' ,currentLocation && destinationLocation)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((documentSnapshot)=>{
            const busId = documentSnapshot.data().busId
            handleFilter(busId)
          })
        });
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
        <Button text="Next" bgcolor="#F76C5E" textcolor="white" press={handleNext} />
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
