import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
const BusStatus = () => {
    const [textInput, setTextInput] = useState("");
    const data = [
        { key: 0, label: 'Cheruvathur to Cheemeni' },
        { key: 1, label: 'Cheemeni to Payyanur' },
        { key: 2, label: 'payyanur to Cheemeni' },
        { key: 3, label: 'Cheemeni to Cheruvathur'},
    ];
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={styles.routeContainer}>
                <View style={{marginTop:60}}>
                    <Text style={{color:"white",fontSize:15,marginBottom:8,marginLeft:20}}>Route</Text>
                    <ModalSelector
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ setTextInput(option.label)}}>
                        <TextInput 
                            style={styles.inputBox}
                            editable={false}
                            value={textInput}       
                        />
                    </ModalSelector>
                </View>
            </View>
            <View style={styles.busStatusContainer}></View>
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
        flex:1.25
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
