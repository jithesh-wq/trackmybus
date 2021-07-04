import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <LottieView style={{width:"50%"}} source={require('../assets/animations/loading.json')} autoPlay loop /> 
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
