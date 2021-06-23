import { process } from 'babel-jest';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      styles={{
        container: {
          flex: 0,
          backgroundColor: "blue",
          height: 100,
          alignItems: 'center'
        },
        textInputContainer: {
          flexDirection: 'row',
          width: 380
        },
        textInput: {
          backgroundColor: 'red',
          height: 55,
          borderRadius: 35,
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontSize: 15,
          flex: 1,
        },
        poweredContainer: {
          display: "none"
        },
        powered: {},
        listView: {
          position: 'absolute',
          top: 55,
          height: 50,
        },
        row: {
          backgroundColor: '#FFFFFF',
          padding: 13,
          height: 44,
          flexDirection: 'row',
        },
        separator: {
          height: 0,
        },
        description: {},
        loader: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 20,
        }
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: "AIzaSyBi1FPUnzyBEH8QWkLI1hZzCEkeAVvRhJU",
        language: 'en',
      }}
    />

  )
}

export default LocationInput

const styles = StyleSheet.create({
})
