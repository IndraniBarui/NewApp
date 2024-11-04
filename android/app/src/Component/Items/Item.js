import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useSelector } from "react-redux";
import Feild from "../Login/Feild";
import Btn from "../Login/Btn";
import axiosInstance from "../../axiosIntance";
import { launchImageLibrary } from "react-native-image-picker";

const Item = () => {
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");

  const handleImagePicker = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image.');
      } else {
        const { base64 } = response.assets[0];
        console.log('Selected image Base64:', base64);
        setPhotoBase64(base64);
      }
    });
  };

  const handlePost = async () => {
    const json = JSON.stringify({
      images: [
        {
          url: `data:image/jpeg;base64,${photoBase64}`, // Ensure correct format
          title: title,
          description: description,
          price:price
        },
      ],
    });

    try {
      const response = await axiosInstance.put(`/post_items/${user.id}`, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response, "response");
      if (response.status === 200) {
        Alert.alert("Submitted");
        setTitle('');
        setDescription('');
        setPrice('');
        setPhotoBase64('');
       
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Not submitted");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <Feild value={title} onChangeText={setTitle} />
      <Text>Description</Text>
      <Feild value={description} onChangeText={setDescription} />
      <Text>Price</Text>
      <Feild value={price} onChangeText={setPrice} />
      <Text>Image</Text>
      <Feild value={photoBase64 ? "Image Selected" : ""} onPressIn={handleImagePicker} placeholder="Select Image" />
      <Btn
        btnLabel="Update"
        bgColor="black"
        textColor="white"
        width={"65%"}
        Press={handlePost}
      />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f7642e",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
