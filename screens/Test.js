import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';

const test = () => {
    const [selectedValue, setSelectedValue] = useState()
    return (
        <Picker
                style={{ height: 100, width: 200 }}
                // selectedValue={selectedValue}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
            }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
    )
}

export default test

const styles = StyleSheet.create({})
