import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import InputField from '../components/InputField'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
const DriverDetails = ({navigation}) => {
    const [option1Selected, setOption1Selected] = useState(false)
    const [option2Selected, setOption2Selected] = useState(false)
    const [option3Selected, setOption3Selected] = useState(false)
    const [serviceMode, setServiceMode] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState("")
    const [busName, setBusName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const option1SelectorStyle = {
      width:80,
      height:40,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:option1Selected?"#F76C5E":"#39375B"
    }
    const option2SelectorStyle = {
      width:80,
      height:40,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:option2Selected?"#F76C5E":"#39375B"
    }
    const option3SelectorStyle = {
      width:80,
      height:40,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:option3Selected?"#F76C5E":"#39375B"

    }
    const handleOption1Selection = ()=>{
      if(option2Selected || option3Selected){
        if(option2Selected){
          setOption2Selected(false)
          setOption1Selected(true)
          
        }else{
          setOption3Selected(false)
          setOption1Selected(true)
        }
      }else{
        setOption1Selected(!option1Selected)
      }
      if(!option1Selected){
        setServiceMode("LS")
      }else{
        setServiceMode(null)
      }
    }
    const handleOption2Selection = ()=>{
      if(option1Selected || option3Selected){
        if(option1Selected){
          setOption1Selected(false)
          setOption2Selected(true)
        }else{
          setOption3Selected(false)
          setOption2Selected(true)
        }
      }else{
        setOption2Selected(!option2Selected)
      }
      if(!option2Selected){
        setServiceMode("TT")
      }else{
        setServiceMode(null)
      }
    }
    const handleOption3Selection = ()=>{
      if(option2Selected || option1Selected){
        if(option2Selected){
          setOption2Selected(false)
          setOption3Selected(true)
        }else{
          setOption1Selected(false)
          setOption3Selected(true)
        }
      }else{
        setOption3Selected(!option3Selected)
      }
      if(!option3Selected){
        setServiceMode("FP")
      }else{
        setServiceMode(null)
      }
    }
    const handleNext = () =>{
      if(serviceMode!=null && userId!=null && userName!="" && busName!=""){
        setIsLoading(true)
        firestore()
          .collection('Buses')
          .doc(userId)
          .set({
            userName: userName,
            busName:busName,
            serviceMode:serviceMode,
            currentStatus:'Not Running',
            isBreackDown:false,
            isInTraffic:false,
            isRouteCancelled:false
          })
          .then(() => {
            console.log('Data Added!');
            setUserName(null)
            setBusName(null)
            setServiceMode(null)
            setOption1Selected(false)
            setOption2Selected(false)
            setOption3Selected(false)
            updateStorage()
            setIsLoading(false)
            navigation.navigate("AddRoutes")
          });
      }else{
        alert("Empty Fields")
      }
    }
    const getUserName = (value) => {
      setUserName(value)
    }
    const getBusName = (value) => {
      setBusName(value)
    }
    const updateStorage = async() => {
      try{
        await AsyncStorage.setItem("DriverSet","true")
      }catch(e){
        console.log(e);
      }
    }
    //firebasse functions
    useEffect(() => {
      const getUser = async() => {
          setIsLoading(true)
          const user = await auth().currentUser
          const driverSet = await AsyncStorage.getItem("DriverSet")
          if(driverSet==="true"){
            navigation.navigate("AddRoutes")
          }
          setUserId(user.uid);
          setIsLoading(false)
      }
      getUser()
    }, [])
    console.log(userName,busName,serviceMode);
    console.log();
    if(isLoading){
      return(
        <LoadingScreen/>
      )
    }
    return (
    <View style={{flex:1,backgroundColor:"white",alignItems:'center'}}>
      {/* <View style={styles.logo}>
        <Text>TMBus</Text>
      </View> */}
      <View style={styles.inputContainer}>
      <InputField label="Name" password={false} color="black" getText={value=>getUserName(value)}/>
      <InputField label="Busname" password={false} color="black" getText={value=>getBusName(value)}/>
      <Text>Service Type</Text>
      <View style={styles.optionsContainer}>
            <TouchableOpacity style={option1SelectorStyle} onPress={handleOption1Selection}>
                <Text style={styles.optionLabel}>LS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={option2SelectorStyle} onPress={handleOption2Selection}>
                <Text style={styles.optionLabel}>TT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={option3SelectorStyle} onPress={handleOption3Selection}>
                <Text style={styles.optionLabel}>FP</Text>
            </TouchableOpacity>
        </View>
      </View>
      <Button text="Next" bgcolor="#F76C5E" textcolor="white" press={handleNext}/>
    </View>
    )
}

export default DriverDetails

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        marginTop:50 
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
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red"
      },
      suggestionText: {
        color: "green",
      },
// optionselector style
      optionsContainer:{
        width:300,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
    },
    optionButton:{
        width:80,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:"black"
    },
    optionLabel:{
        color:"white",
        fontSize:15,
        fontWeight:"bold"
    }
})
