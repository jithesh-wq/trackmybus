import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LocationInput from './components/LocationInput'
import GettingStarted from './screens/GettingStarted'
import LocationSelector from './screens/LocationSelector'
import Login from "./screens/Login"
import Register from './screens/Register'
import Signup from "./screens/Signup"
import UserPicker from './screens/UserPicker'

const App = () => {
  return (
    <View style={styles.container}>
      <LocationSelector/>  
    </View>
  )
}

export default App

const styles = StyleSheet.create({
    container:{
      backgroundColor:"white",
      flex:1,
    }
})
