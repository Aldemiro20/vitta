import React,{useEffect,useContext,useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import {View,Image, ActivityIndicator} from 'react-native'
import {UserContext} from './contexts/UserContext';
export default function Splash() {
  const navigation=useNavigation();
 

  useEffect(()=>{
    const checkToken=async()=>{
    const token =await AsyncStorage.getItem("token"); 
    const permission =await AsyncStorage.getItem("permission");
    if(token && permission==1 ){
      //navigation.reset({
       // routes:[{name:'DrawerNavigation'}]
      // })
     alert("admin");
    }else if(token && permission==0){
      //navigation.reset({
      //  routes:[{name:'DrawerNavigation'}]
      // })
      alert("user");
    }else{
      navigation.navigate('SignIn');
    }
    }
 
    checkToken();
  },[])
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} > 
    <Image style={{height:300, width:'100%'}} resizeMode="cover"  source={require("./assets/paciente.png")} />
    <ActivityIndicator size="large"  color="#FFB74D" />
   </View>


  );

}

