import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FallBack = () => {
  return (
    <View style={{alignItems:"center"}}>
    <Image source={require("../Assets/Doraemon.webp")} style={{height:400, width:400, marginTop:40}}/>
    <Text style={{fontSize:40, fontWeight:40, color:"black"}}>Hello Nobita</Text>
    </View>
  )
}

export default FallBack

const styles = StyleSheet.create({})
