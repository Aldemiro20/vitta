import React,{ useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';


import { Loading } from '../components/Loading';
import { SignIn } from '../screens/SignIn';

import { AppRoutes } from './app.routes';

export function Routes() {
  const [loading, setIsLoading] = useState(false);
  const [user, setUser] = useState()

 

  return (
    <NavigationContainer>
   <AppRoutes /> 
    </NavigationContainer>
  )
}