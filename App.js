import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from "./screens/Login"
import Signup from "./screens/Signup"
const App = () => {
  return (
    <View style={styles.container}>
      <Login/>
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
