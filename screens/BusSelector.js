import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native'
import LottieView from 'lottie-react-native';

const BusSelector = ({route,navigation}) => {
   const {buses} = route.params
   console.log(buses)
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            {/* <TouchableWithoutFeedback onPress={()=>{console.log("backPressed")}}  >
                <Image
                    style={styles.backButton}
                     source={require('../assets/icons/back.png')}
                />
            </TouchableWithoutFeedback> */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Available Buses
                </Text>
            </View>
            <View>
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.listOfBuses}
                onPress={()=>{navigation.navigate("BusDetails")}}>
                <View style={styles.busContainer}>
                    <Text style={styles.busTitle}>
                        Teecee
                    </Text>
                    <Image
                    style={styles.backButton}
                     source={require('../assets/icons/forward.png')}
                />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.listOfBuses}
                onPress={()=>{console.log("Bus selected")}}>
                <View style={styles.busContainer}>
                    <Text style={styles.busTitle}>
                        YEM YES
                    </Text>
                    <Image
                    style={styles.backButton}
                     source={require('../assets/icons/forward.png')}
                />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.listOfBuses}
                onPress={()=>{console.log("Bus selected")}}>
                <View style={styles.busContainer}>
                    <Text style={styles.busTitle}>
                        Busname3
                    </Text>
                    <Image
                    style={styles.backButton}
                     source={require('../assets/icons/forward.png')}
                />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.listOfBuses}
                onPress={()=>{console.log("Bus selected")}}>
                <View style={styles.busContainer}>
                    <Text style={styles.busTitle}>
                        Busname4
                    </Text>
                    <Image
                    style={styles.backButton}
                     source={require('../assets/icons/forward.png')}
                />
                </View>
            </TouchableOpacity>
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
