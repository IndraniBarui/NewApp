import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const ProductCard = ({item, handleLikes}) => {
  const navigation=useNavigation();
  return (
    <TouchableOpacity onPress ={()=>{
        navigation.navigate("PRODUCT_DETAILS",{item})
    }} style={styles.container}>
      <Image
        source={{uri:item.image}}
        style={styles.coverImage}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={()=>{handleLikes(item)}
      } style={styles.likeContainer}>
        {item?.isLiked ? (
          <AntDesign name={"heart"} size={20} color={"#f23019"} />
        ) : (
          <AntDesign name={"hearto"} size={20} color={"#f23019"} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    position: "relative",
  },
  coverImage: {
    height: 300,
    width: 170,
    borderRadius: 18,
    marginVertical: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#504f4f",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8a8989",
  },
  content: {
    paddingHorizontal: 10,
  },
  likeContainer: {
    height: 34,
    width: 34,
    backgroundColor: "#f7f5f4",
    borderRadius: 17,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 24,
    right: 23,
  },
});
