import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
const ToastMessage = ({type, text, description,timeout}) => {
    const TOAST_TYPE={
        success:{
            backgroundColor:"#30f81d",
            icon:'checkcircleo'
        },
        danger:{
            backgroundColor:"#fc320a",
            icon:'questioncircleo'
        },
        info:{
            backgroundColor:"#f2f31c",
            icon:'infocirlceo'
        },
        warning:{
            backgroundColor:"#5064f4",
            icon:'exclamationcircleo'
        }
    }
const backgroundColor = TOAST_TYPE[type].backgroundColor;
const icon = TOAST_TYPE[type].icon

  return (
    <View style={{
        
        position: 'absolute',
        top: 50,
        left: '10%',
        right: '10%',
        width: '80%',
        height: 100,
        backgroundColor: backgroundColor,
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          height: 2,
          width: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.64,
        elevation: 5,
      
    }}>
        <AntDesign name={icon} size={30} color={"black"}/>
        <View style={{marginLeft:12}}>
        <Text style={{fontSize:18,fontWeight:'600', color:'#FFF'}}>{text}</Text>
        <Text style={{fontSize:18,fontWeight:'600', color:'#FFF'}}>{description}</Text>
        </View>
      
    </View>
  )
}

export default ToastMessage

const styles = StyleSheet.create({
   
})