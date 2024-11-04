import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Btn = ({bgColor, btnLabel,textColor, Press, width}) => {
  return (
    <TouchableOpacity 
    onPress={Press}
    style={{backgroundColor: bgColor,
      borderRadius:100,
      width:width || 350,
      height:50,
      paddingVertical:5,
      marginVertical:10,
      alignItems:'center',
      justifyContent:'center',
      display:'flex',
      marginBottom:10,
    }}>
        <Text style={{color:textColor,fontSize:20, fontWeight:"bold"}}>
            {btnLabel}
        </Text>
    </TouchableOpacity>
  )
}

export default Btn

const styles = StyleSheet.create({
  
})