import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GettingStarted from './screens/GettingStarted'
import LocationSelector from './screens/LocationSelector'
import Login from "./screens/Login"
import Register from './screens/Register'
import Signup from "./screens/Signup"
import UserPicker from './screens/UserPicker'
import BusSelector from './screens/BusSelector'
import BusDetails from "./screens/BusDetails"
import DriverDetails from './screens/DriverDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    
    // <Stack.Navigator screenOptions={{headerShown: false}}>
    //     <Stack.Screen
    //       name="UserPicker"
    //       component={UserPicker} />
    //     <Stack.Screen name="GettingStarted" component={GettingStarted}  />
    //     <Stack.Screen name="LocationSelector" component={LocationSelector}  />
    //     <Stack.Screen name="BusSelector" component={BusSelector}  />
    //     <Stack.Screen name="BusDetails" component={BusDetails}  />
    //     <Stack.Screen name="Register" component={Register}  />
    //     <Stack.Screen name="Signup" component={Signup}  />
    //     <Stack.Screen name="Login" component={Login}  />
    //     <Stack.Screen name="DriverDetails" component={DriverDetails}  />
    //   </Stack.Navigator>
      
    // </NavigationContainer>
    <DriverDetails/>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  }
})
