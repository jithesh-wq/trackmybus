import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GettingStarted from './screens/GettingStarted'
import LocationSelector from './screens/LocationSelector'
import Login from "./screens/Login"
import Register from './screens/Register'
import Signup from "./screens/Signup"
import UserPicker from './screens/UserPicker'
import BusSelector from './screens/BusSelector'

const App = () => {
  return (
    <View style={styles.container}>
      <BusSelector />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  }
})
