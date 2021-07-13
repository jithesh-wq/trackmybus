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
    const [boundaryPoints, setBoundaryPoints] = useState({
        starting:{
            latitude:75,
            longitude:12
        },
        ending:{
            latitude:75,
            longitude:12
        }
    })
    const [busStops, setBusStops] = useState([
        {
            latitude:75,
            longitude:12
        },
        {
            latitude:75,
            longitude:12
        },
        {
            latitude:75,
            longitude:12
        },
        {
            latitude:75,
            longitude:12
        },
        {
            latitude:75,
            longitude:12
        },
    ])
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
  useEffect(() => {
    const subscriber = firestore()
      .collection('Buses')
      .doc(route.params.busId)
      .onSnapshot(documentSnapshot => {
        setBoundaryPoints({
            // starting:{
            //     latitude:documentSnapshot.data().currentRoute.data().
            // }
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
                    latitude: 12.22615,
                    longitude: 75.1977641,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                    {/* <Polyline
                        coordinates={[
                            { latitude: 12.2165,
                            longitude: 75.1626},
                            {
                            latitude: 12.221011974964224,
                            longitude:  75.18586323427972,
                            },
                            
                        ]}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    /> */}
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            }}
                        image={start}
                    ></Marker>
                        <Marker
                        coordinate={{
                            latitude: 12.2165,
                            longitude: 75.1626,
                            }}
                        image={start}
                    ></Marker>
                    <Marker
                        coordinate={{
                            latitude: 12.221011974964224,
                            longitude:  75.18586323427972,
                            }}
                        image={busStop}
                    ></Marker>
                    <Marker
                        coordinate={{
                            latitude: 12.224756166634952,
                            longitude:  75.19178864039236,
                            }}
                        image={busStop}

                    ></Marker>
                    <Marker
                        coordinate={{
                            latitude: 12.22475616,
                            longitude:  75.19288864,
                            }}
                        image={bus}

                    ></Marker>
                    <Marker
                        coordinate={{
                            latitude: 12.224756166634952,
                            longitude:  75.19178864039236,
                            }}
                        image={busStop}
                        
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