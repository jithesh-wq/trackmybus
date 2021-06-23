import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LocationInput from '../components/LocationInput';
import Button from "../components/Button"

const LocationSelector = () => {
  return (
    <View>
      <View style={styles.logo}>
        <Text>TMBus</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Current Location</Text>
        <LocationInput />
        <Text style={styles.inputLabel}>Destination
        </Text>
        <LocationInput />
        <Button text="Next" bgcolor="#F76C5E" textcolor="white" />
      </View>
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    fontSize: 15,
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
