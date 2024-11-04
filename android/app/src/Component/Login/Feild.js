import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Feild = (props) => {
  return (
    <TextInput
    {...props}
    style={styles.inputStyle}
    placeholderTextColor={'#f7642e'}
   
    ></TextInput>
  )
}

export default Feild

const styles = StyleSheet.create({
    inputStyle:{
        borderRadius: 100,
        color:"#f7642e",
        paddingHorizontal:18,
        width:'80%',
        backgroundColor:'rgb(220,220,220)',
        fontSize:18,
      marginTop:10
        
    }
})