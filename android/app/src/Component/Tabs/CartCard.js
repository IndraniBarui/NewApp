import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const imageUrl =
  "https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/cwlk21f74nd9iamrlzkh.png";
const CartCard = ({item,deleteCart}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri:item.image}} style={styles.coverImage}/>
      <View style={styles.cartcontainer}>
<Text style={styles.title}>{item.title}</Text>
<Text style={styles.price}>${item.price}</Text>
<View style={styles.circleContainer}>
       <View style={[styles.circle, {backgroundColor:item.color}]}/> 
       <View style={styles.sizeCircle}>
        <Text style={styles.sizeText}>{item.size}</Text></View> 
      </View>
      </View>
      <TouchableOpacity onPress={()=>{
        deleteCart(item)
      }}>
      <MaterialCommunityIcons name={"delete"} color ={"#f23f3f"} size={25}/>
      </TouchableOpacity>
    </View>
  )
}

export default CartCard

const styles = StyleSheet.create({
    container:{
marginVertical:10,
flexDirection:'row'
    },
    coverImage:{
        height:125,
        width:"30%",
        borderRadius:20,
    },
    cartcontainer:{
flex:1,
marginHorizontal:10,
    },
    title:{
fontSize:20,
color:"#0b0b0b",
fontWeight:"500",
    },
    price:{
color:"#8c8989",
marginVertical:10,
fontSize:18,
fontWeight:"400",
    },
    circle:{
      height: 36,
      width: 36,
      borderRadius: 20,
      backgroundColor:"#93a8b0"
    },
    circleContainer:{
      flexDirection:"row",
      width:"100%"
     
    },
    sizeCircle:{
      backgroundColor:"white",
      height:36,
      width:36,
      borderRadius:16,
      justifyContent:"center",
      alignItems:"center",
      marginLeft:10
    },
    sizeText:{
      fontSize:16,
      fontWeight:"500",
    }
})