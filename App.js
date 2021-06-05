import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GettingStarted from './screens/GettingStarted'
import Login from "./screens/Login"
import Register from './screens/Register'
import Signup from "./screens/Signup"
import UserPicker from './screens/UserPicker'
const App = () => {
  return (
    <View style={styles.container}>
      <UserPicker/> 
    </View>
  )
}

export default App

const styles = StyleSheet.create({
    container:{
      backgroundColor:"white",
      height:"100%"
    }
})
