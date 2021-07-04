import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
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
import AddRoutes from './screens/AddRoutes';
import BusStatus from './screens/BusStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './screens/LoadingScreen';
const Stack = createStackNavigator();

const App = () => {
  const [userMode, setUserMode] = useState("notSet");
  const [state, setstate] = useState("");
  const [firstTimeUser, setfirstTimeUser] = useState(true)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const userType = await AsyncStorage.getItem('userMode')
        const value = await AsyncStorage.getItem('isFirstTime')
        if(userType !== null) {
          if(userType === "passenger"){
            setUserMode("passenger")
            if(value==="no"){
              setfirstTimeUser(false)
            }
            else{
              setfirstTimeUser(true)
            }
          }else{
            setUserMode("driver")
          }
        }else{
          console.log("test");
        }
      } catch(e) {
        console.log(e);
      }
      setIsLoading(false)
    }
    getData()
  }, []);
  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
    {userMode==="notSet"?(
      <>
          <Stack.Screen name="UserPicker" component={UserPicker} />
          <Stack.Screen name="GettingStarted" component={GettingStarted}  />
          <Stack.Screen name="LocationSelector" component={LocationSelector}  />
          <Stack.Screen name="BusSelector" component={BusSelector}  />
          <Stack.Screen name="BusDetails" component={BusDetails}  />
          <Stack.Screen name="Register" component={Register}  />
          <Stack.Screen name="Signup" component={Signup}  />
          <Stack.Screen name="Login" component={Login}  />
          <Stack.Screen name="DriverDetails" component={DriverDetails}  />
          <Stack.Screen name="AddRoutes" component={AddRoutes}  />
          <Stack.Screen name="BusStatus" component={BusStatus}  />
        </>
    ):(
      userMode==="passenger"?(
        firstTimeUser?(
          <>
            <Stack.Screen name="GettingStarted" component={GettingStarted}  />
            <Stack.Screen name="LocationSelector" component={LocationSelector}  />
            <Stack.Screen name="BusSelector" component={BusSelector}  />
            <Stack.Screen name="BusDetails" component={BusDetails}  />
          </>
        ):(
          <>
            <Stack.Screen name="LocationSelector" component={LocationSelector}  />
            <Stack.Screen name="BusSelector" component={BusSelector}  />
            <Stack.Screen name="BusDetails" component={BusDetails}  />
          </>
        )
      ):(
        user!==null?(
          <>
            <Stack.Screen name="DriverDetails" component={DriverDetails}  />
            <Stack.Screen name="AddRoutes" component={AddRoutes}  />
            <Stack.Screen name="BusStatus" component={BusStatus}  />
          </>
        ):(
          <>
            <Stack.Screen name="Register" component={Register}  />
            <Stack.Screen name="Signup" component={Signup}  />
            <Stack.Screen name="Login" component={Login}  />
            <Stack.Screen name="DriverDetails" component={DriverDetails}  />
            <Stack.Screen name="AddRoutes" component={AddRoutes}  />
            <Stack.Screen name="BusStatus" component={BusStatus}  />
          </>
        )
      
      )
    )}
      </Stack.Navigator>  
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  }
})
