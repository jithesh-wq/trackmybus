import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LocationInput from '../components/LocationInput';
import Button from "../components/Button"

const LocationSelector =  ({navigation}) => {
  const nextHandl = ()=>{
    navigation.navigate('BusSelector')
  }
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={styles.logo}>
        <Text>TMBus</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Current Location</Text>
        <LocationInput />
        <Text style={styles.inputLabel}>Destination
        </Text>
        <LocationInput />
        <Text style={styles.suggestionText}>Select place from the suggestions</Text>
        <Button text="Next" bgcolor="#F76C5E" textcolor="white" press={nextHandl} />
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
