import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import GettingStarted from './screens/GettingStarted'
import LocationSelector from './screens/LocationSelector'
import Login from "./screens/Login"
import Register from './screens/Register'
import Signup from "./screens/Signup"
import UserPicker from './screens/UserPicker'
import BusSelector from './screens/BusSelector'
import BusDetails from "./screens/BusDetails"
import DriverDetails from './screens/DriverDetails';
import AddRoutes from './screens/AddRoutes';
import BusStatus from './screens/BusStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './screens/LoadingScreen';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const App = () => {
  const [userMode, setUserMode] = useState("notSet");
  const [state, setstate] = useState("");
  const [firstTimeUser, setfirstTimeUser] = useState(true)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const userType = await AsyncStorage.getItem('userMode')
        const value = await AsyncStorage.getItem('isFirstTime')
        if(userType !== null) {
          if(userType === "passenger"){
            setUserMode("passenger")
            if(value==="no"){
              setfirstTimeUser(false)
            }
            else{
              setfirstTimeUser(true)
            }
          }else{
            setUserMode("driver")
          }
        }else{
          console.log("test");
        }
      } catch(e) {
        console.log(e);
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 500);    }
    getData()
  }, []);
  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser)
  }, [])
  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}} >
    {userMode==="notSet"?(
      <>
          <Stack.Screen name="UserPicker" component={UserPicker}
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="GettingStarted" component={GettingStarted} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="LocationSelector" component={LocationSelector} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="BusSelector" component={BusSelector} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="BusDetails" component={BusDetails} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="Register" component={Register} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="Signup" component={Signup} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="Login" component={Login} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="DriverDetails" component={DriverDetails} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="AddRoutes" component={AddRoutes} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
          <Stack.Screen name="BusStatus" component={BusStatus} 
          options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }} />
        </>
    ):(
      userMode==="passenger"?(
        firstTimeUser?(
          <>
            <Stack.Screen name="GettingStarted" component={GettingStarted} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
            <Stack.Screen name="LocationSelector" component={LocationSelector} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
            <Stack.Screen name="BusSelector" component={BusSelector} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
            <Stack.Screen name="BusDetails" component={BusDetails}  
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}/>
          </>
        ):(
          <>
            <Stack.Screen name="LocationSelector" component={LocationSelector}
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
            <Stack.Screen name="BusSelector" component={BusSelector} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
            <Stack.Screen name="BusDetails" component={BusDetails} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
          </>
        )
      ):(
        user!==null?(
          <>
            <Stack.Screen name="DriverDetails" component={DriverDetails} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
            <Stack.Screen name="AddRoutes" component={AddRoutes} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
            <Stack.Screen name="BusStatus" component={BusStatus} 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
          </>
        ):(
          <>
            <Stack.Screen name="Register" component={Register}
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
            <Stack.Screen name="Signup" component={Signup}
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
            <Stack.Screen name="Login" component={Login}
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
            <Stack.Screen name="DriverDetails" component={DriverDetails}
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
            <Stack.Screen name="AddRoutes" component={AddRoutes}
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
            <Stack.Screen name="BusStatus" component={BusStatus}
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}  />
          </>
        )
      
      )
    )}
      </Stack.Navigator>  
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  }
})
