import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Home, Details, Register,RegisterUser,SignIn,HomeAdmin,Update,UpdateUser, DetailsUser,Search} from '../screens';
import Splash from '../splash';

const { Navigator, Screen } = createNativeStackNavigator();
const Stack = createStackNavigator();
export function AppRoutes() {
  return (
      <Stack.Navigator
      initialRouteName='SignIn'
      screenOptions={{
        headerShown: false
      }}
      >
       <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
         <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
        <Stack.Screen
          name="HomeAdmin"
          component={HomeAdmin}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
         <Stack.Screen
          name="DetailsUser"
          component={DetailsUser}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
         <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
         <Stack.Screen
          name="Search"
          component={Search}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            headerStyle: {
              backgroundColor: 'transparent',
            }
          }}
          
        />
        
        </Stack.Navigator>

        
    
  )
}