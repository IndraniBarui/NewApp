import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Background from './Background'
import Btn from './Btn'
import { useNavigation } from "@react-navigation/native";
const Login = () => {
  const navigation = useNavigation();
  return (
    <View>

     <Background>
        <View style={{marginHorizontal:40, marginVertical:100}}>
        <Text style={{color:"black", fontSize:70, marginTop:40, marginBottom:50}}>Let's Start</Text>
        <Btn btnLabel="Login" bgColor="black" textColor="white" Press={()=>navigation.navigate("LoginPage")}></Btn>
        <Btn btnLabel="Logout" bgColor="white" textColor="black" Press={()=>navigation.navigate("Signup")}></Btn>
        </View>
       
     </Background>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})