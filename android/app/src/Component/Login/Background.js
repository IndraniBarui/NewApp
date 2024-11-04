import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Background = ({children}) => {
  return (
    <View>
    <Image source={require('../../Assets/background.jpeg')} style={{height:"100%", width:"100%"}}/>
    <View style={{position:"absolute"}}>
        {children}
    </View>
    </View>
  )
}

export default Background

const styles = StyleSheet.create({})