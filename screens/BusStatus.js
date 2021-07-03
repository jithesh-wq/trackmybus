import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import Button from '../components/Button'
const BusStatus = () => {
    const [textInput, setTextInput] = useState("");
    const [isBreakDown, setIsBreakDown] = useState(false)
    const [isInTraffic, setIsInTraffic] = useState(false)
    const [isTripCancelled, setIsTripCancelled] = useState(false)
    const [runningStatus, setRunningStatus] = useState("Stopped")
    const data = [
        { key: 0, label: 'Cheruvathur to Cheemeni' },
        { key: 1, label: 'Cheemeni to Payyanur' },
        { key: 2, label: 'Payyanur to Cheemeni' },
        { key: 3, label: 'Cheemeni to Cheruvathur'},
    ];
    const handleBreakDown = () => {
      console.log("breakDown");
      setIsBreakDown(!isBreakDown)
    }
    const handleInTraffic = () => {
        console.log("in Traffic");
        setIsInTraffic(!isInTraffic)
    }
    const handleTripCancelled = () => {
        console.log("Trip Cancelled");
        setIsTripCancelled(!isTripCancelled)
        setRunningStatus("Stopped")
    }
    const handleStart =  () => {
      setRunningStatus("Running")
      setIsTripCancelled(false)
    }
    const handleStop = () => {
      setRunningStatus("Stopped")
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.routeContainer}>
                <View style={{marginTop:60}}>
                    <Text style={{color:"white",fontSize:15,marginBottom:8,marginLeft:20}}>Route Name</Text>
                    <ModalSelector
                    data={data}
                    onChange={(option)=>{ setTextInput(option.label)}}>
                        <TextInput 
                            style={styles.inputBox}
                            editable={false}
                            value={textInput}  
                            placeholder="Select a route"
                            placeholderTextColor="grey"  
                        />
                    </ModalSelector>
                    <View style={{flexDirection:"row",justifyContent:'space-around'}}>
                        <Button bgcolor="white" textcolor="green" text="Start" press={handleStart}/>
                        <Button bgcolor="white" textcolor="red" text="Stop" press={handleStop}/>
                    </View>
                    <Text style={{alignSelf:'center',fontSize:15,color:"white",marginTop:10}}>Current Status : {runningStatus}</Text>
                </View>
            </View>
            <View style={styles.busStatusContainer}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Bus Status</Text>
                <TouchableOpacity
                    
                    style={
                            {
                                width: 140,
                                height: 45,
                                backgroundColor:isBreakDown?"#F76C5E":"white",
                                borderRadius: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderWidth:isBreakDown?0:0.1,
                                elevation:5

                            }
                    }
                    activeOpacity={0.7}
                    onPress={handleBreakDown}
                >
                <Text 
                    style={
                            {
                                color: isBreakDown?"white":"grey",
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                    }
                >
                Break Down
                </Text>
            </TouchableOpacity>
                <TouchableOpacity
                    
                    style={
                            {
                                width: 140,
                                height: 45,
                                backgroundColor:isInTraffic?"#F76C5E":"white",
                                borderRadius: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderWidth:isInTraffic?0:0.1,
                                elevation:5
                            }
                    }
                    activeOpacity={0.7}
                    onPress={handleInTraffic}
                >
                <Text 
                    style={
                            {
                                color:isInTraffic?"white":"grey",
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                    }
                >
                In TRaffic
                </Text>
            </TouchableOpacity>
                <TouchableOpacity
                    
                    style={
                            {
                                width: 140,
                                height: 45,
                                backgroundColor:isTripCancelled?"#F76C5E": "white",
                                borderRadius: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderWidth:isTripCancelled?0:0.1,
                                elevation:5

                            }
                    }
                    activeOpacity={0.7}
                    onPress={handleTripCancelled}
                >
                <Text 
                    style={
                            {
                                color:isTripCancelled?"white":"grey",
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                    }
                >
                Trip Cancelled
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default BusStatus

const styles = StyleSheet.create({
    routeContainer:{
        backgroundColor:"#39375B",
        flex:1,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        alignItems:'center',
        padding:10
    },
    busStatusContainer:{
        flex:1.5,
        alignItems:'center',
        justifyContent:'center'
    },
    inputBox:{
        height:55,
        width:380,
        borderWidth:1,
        borderColor:'grey',
        paddingLeft:20,
        marginBottom:10,
        borderRadius:35,
        fontSize:17,
        backgroundColor:"white",
        color:"black",
      }
})
