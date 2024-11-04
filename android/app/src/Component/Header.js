import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native";

const Header = ({isCart}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
        navigation.navigate("HOME")
      }} style={styles.appIconContainer}>
      {isCart?(
      <MaterialIcons name={"arrow-back"} size={40} color={"#fd1d1d"}/>
      ):(
        <Image source={require("../Assets/apps.jpeg")} style={styles.appIcon} />
      )}
       
      </TouchableOpacity>
     {isCart &&<Text style={styles.myCart}>My Cart</Text> } 
     <TouchableOpacity onPress={()=>navigation.navigate("ACOUNT")}>
     <Image source={require("../Assets/Dp.jpeg")} style={styles.dp} />
     </TouchableOpacity>
    
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
  appIconContainer: {
    backgroundColor: "#FDF0F3",
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    height: 28,
    width: 28,
  },
  dp: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  myCart:{
    fontSize:28,
    color:"#111111",
  }
});
