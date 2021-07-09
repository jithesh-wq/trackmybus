import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView,View, TouchableOpacity, BackHandler } from 'react-native'
import InputField from '../components/InputField'
import LocationInput from '../components/LocationInput'
import Button from '../components/Button'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddRoutes = ({navigation}) => {
    const [endingLocation, setEndingLocation] = useState()
    const [startingLocation, setStartingLocation] = useState()
    const [routeName, setRouteName] = useState("")
    const [busStops, setBusStops] = useState([])
    const [stopName, setStopName] = useState()
    const [clearField, setClearField] = useState(0)
    const [userId, setUserId] = useState(null)
    const [stopNo, setStopNo] = useState(1)
    const [isloading,setIsLoading] = useState(false)
    useEffect(() => {
        const getUid = async() => {
          const currentUser = await auth().currentUser
          const routeSet = await AsyncStorage.getItem("RouteSet")
          if(routeSet==="true"){
            navigation.navigate("BusStatus")
          }
          setUserId(currentUser.uid)
        }
        getUid()
    }, []);
    const addStop = ()=>{
        console.log("Added stop")
        setBusStops(prevArray => [...prevArray, stopName])
        setClearField((prevState)=>prevState+1)
        setStopNo(busStops.length+2)
    }
    const saveRoute = ()=>{
        setIsLoading(true)
        firestore()
          .collection('Routes')
          .doc()
          .set({
            busId:userId,
            routeName:routeName,
            startingLocation:startingLocation,
            endingLocation:endingLocation,
            busStops:busStops
          })
          .then(() => {
            console.log('Data Added!');
            setEndingLocation("")
            setStartingLocation("")
            updateStorage()
            setIsLoading(false)
            navigation.navigate('BusStatus')
          })
          .catch((e)=>{
            console.log(e);
          });
    }
    const getEndingLocation = (value) => {
      setEndingLocation(value)
    }
    const getStartingLocation = (value) => {
      console.log("gotLocation",value)
      setStartingLocation(value)
    }
    const getStopName = (value) => {
        setStopName(value)
    }
    const getRouteName = (value) => {
      setRouteName(value)
    }
    const updateStorage = async() => {
      try{
        AsyncStorage.setItem("RouteSet","true")
      }catch(e){
        console.log(e);
      }
    }
    console.log(busStops)
    return (
        <View style={{heightbackgroundColor:"red",flex:1}}>
            <View style={styles.logo}>
                <Text>TMBus</Text>
            </View>
            <View style={styles.inputContainer}>

                <InputField label="Route Name" password={false} color="black" getText={value=>getRouteName(value)}/>
                <Text style={styles.inputLabel}>Starting  </Text>
                <LocationInput getText={(value)=>getStartingLocation(value)}/>
                <Text style={styles.inputLabel}>Ending  </Text>
                <LocationInput getText={(value)=>getEndingLocation(value)}/>
                <Text>Add Stops</Text>
                <View style={styles.busStopContainer}>
                    <Text style={styles.inputLabel}>Stop NO : {stopNo}  </Text>
                    <LocationInput  getText={(value)=>getStopName(value)} clear={clearField}/>


                    {/* <TouchableOpacity style={styles.addButton} onPress={addStop}><Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>+</Text></TouchableOpacity> */}
                </View>
                <View style={styles.buttonContainer}>
                  <Button text="Add Stop" bgcolor="#F76C5E" textcolor="white" press={addStop} />
                  <Button text="Save" bgcolor="#F76C5E" textcolor="white" press={saveRoute} />
                </View>

                
            </View>
          
        </View>
    )
}

export default AddRoutes

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
      },
      inputLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginLeft: 20,
        backgroundColor:"red"
      },
      logo: {
        alignSelf: 'center',
        width: 100,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red"
      },
      suggestionText: {
        color: "green",
      },
      inputLabel: {
        fontSize: 15,
        alignSelf: "flex-start",
        marginLeft: 20,
        marginBottom: 10
      },
      
      addButton:{
          width:30,
          height:30,
          backgroundColor:"#F76C5E",
          marginTop:10,
          borderRadius:5,
          marginLeft:10,
          alignItems:'center',
          justifyContent:'center'
      },
      buttonContainer:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-around'
      }
})
