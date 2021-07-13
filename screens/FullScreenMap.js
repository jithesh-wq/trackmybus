import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore'
import start from '../assets/icons/start.png'
import busStop from '../assets/icons/busStop.png'
import bus from '../assets/icons/bus.png'

const FullScreenMap = ({route}) => {
    const [location, setLocation] = useState({
        latitude:75,
        longitude:12
    })
    // const [boundaryPoints, setBoundaryPoints] = useState({
    //     starting:{
    //         latitude:75,
    //         longitude:12
    //     },
    //     ending:{
    //         latitude:75,
    //         longitude:12
    //     }
    // })
    
    useEffect(() => {
    const subscriber = firestore()
      .collection('CurrentLocation')
      .doc(route.params.busId)
      .onSnapshot(documentSnapshot => {
        setLocation({
            latitude:documentSnapshot.data().currentLocation.coords.latitude,
            longitude:documentSnapshot.data().currentLocation.coords.longitude
        })
      });
    return () => subscriber;
  }, []);
    return (
        <View style= {{flex:1}}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            }}

                    ></Marker>
            </MapView>
        </View>
    )
}

export default FullScreenMap

const styles = StyleSheet.create({
    map: {
   ...StyleSheet.absoluteFillObject,
 },
}) 