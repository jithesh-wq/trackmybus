import { process } from 'babel-jest';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationInput = (props) => {
  const [text, setText] = useState()
useEffect(() => {
 setText("")
}, [props.clear])
  return (
    <GooglePlacesAutocomplete
      styles={{
        container: {
          flex: 0,
          height: 100,
          alignItems: 'center'
        },
        textInputContainer: {
          flexDirection: 'row',
          width: props.width=="small"?340:380,
          height:55
        },
        textInput: {
          backgroundColor: 'white',
          height: 55,
          borderRadius: 35,
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontSize: 15,
          flex: 1,
          borderColor: 'grey',
          borderWidth: 1,
          color: "black",
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
        props.getText(data)
        console.log(data.structured_formatting.main_text)
        setText(data.structured_formatting.main_text)
      }}
      textInputProps={{
        value:text,
        onChangeText:(value)=>setText(value)
      }}
      query={{
        key: "AIzaSyB0g75OwwcVsOKGk4KDBI42y96gSTY5Fm4",
        language: 'en',
        components: 'country:in'
      }}
    />

  )
}

export default LocationInput

const styles = StyleSheet.create({
})


