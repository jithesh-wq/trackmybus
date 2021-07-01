import React from 'react'
import { StyleSheet, Text, ScrollView,View, TouchableOpacity, BackHandler } from 'react-native'
import InputField from '../components/InputField'
import LocationInput from '../components/LocationInput'
import Button from '../components/Button'
const AddRoutes = () => {
    const addStop = ()=>{
        console.log("Added stop")
    }
    const saveRoute = ()=>{
        console.log("Added stop")
    }
    
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.logo}>
                <Text>TMBus</Text>
            </View>
            <View style={styles.inputContainer}>
                <InputField label="Route Name" password={false} color="black"/>
                <Text style={styles.inputLabel}>Starting</Text>
                <LocationInput/>
                <Text style={styles.inputLabel}>Ending</Text>
                <LocationInput/>
                <Text>Add Stops</Text>
                <Text style={styles.inputLabel}>Stop NO : 1</Text>
                <View style={styles.busStopContainer}>
                    <LocationInput width="small"/>
                    <TouchableOpacity style={styles.addButton}><Text style={{fontSize:20,fontWeight:'bold',color:"white"}}>+</Text></TouchableOpacity>
                </View>
                <Button text="Save" bgcolor="#F76C5E" textcolor="white" press={saveRoute} />
                
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
      busStopContainer:{
          flexDirection:'row',
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
      }
})
