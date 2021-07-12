import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native'
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore'
const BusSelector = ({route,navigation}) => {
    const [availableBuses, setAvailableBuses] = useState([])
   const {buses} = route.params
   console.log(`inside selecotr${buses}`)
   useEffect(() => {
       buses.forEach(element => {
           firestore()
           .collection('Buses')
           .doc(element)
           .get()
           .then((documentSnapshot)=>{
               setAvailableBuses(prev=>[...prev,{
                   busName:documentSnapshot.data().busName,
                   busId:element,
                   serviceMode:documentSnapshot.data().serviceMode
               }])
           })
       });
   }, [])

   const busList =availableBuses.map((value,index)=>{
       return(
           <TouchableOpacity
                key={index}
                activeOpacity={0.95}
                style={styles.listOfBuses}
                onPress={()=>{navigation.navigate("BusDetails",{busId:value.busId})}}>
                <View style={styles.busContainer}>
                    <Text style={styles.busTitle}>
                        {value.busName}    ({value.serviceMode})
                    </Text>
                    <Image
                    style={styles.backButton}
                     source={require('../assets/icons/forward.png')}
                />
                </View>
            </TouchableOpacity>
       )
   })
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Available Buses
                </Text>
            </View>
            <View style={{minHeight:250}}>
               {busList}
            </View>
               <LottieView style={{position:'relative',width:"100%",marginTop:"10%"}} source={require('../assets/animations/bus.json')} autoPlay loop />
        </View>
    )
}

export default BusSelector

const styles = StyleSheet.create({
    backButton:{
        width:25,
        height:25,
        // margin:10,
        marginLeft:20,
        marginVertical:10
    },
    titleContainer:{
        alignSelf:'center',
        width:250,
        height:45,
        marginTop:10,
        backgroundColor:"#F76C5E",
        borderRadius:35,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:"white"

    },
    busTitle:{
        fontSize:15,
        color:"white"
    },
    busContainer:{
        alignSelf:'center',
        width:350,
        height:45,
        marginTop:15,
        backgroundColor:"#39375B",
        borderRadius:35,
        paddingHorizontal:15,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    }
})









