import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import Feild from "../../Login/Feild";
import Btn from "../../Login/Btn";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosIntance";
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [photo, setPhoto] = useState(null);
  const [photoBase64, setPhotoBase64] = useState("");
  const [username, setUsername] = useState(user?.firstName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [number, setNumber] = useState(user?.contactNumber ? String(user.contactNumber) : '');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const storedPhoto = await AsyncStorage.getItem('photo');
        const storedPhotoBase64 = await AsyncStorage.getItem('photoBase64');
        if (storedPhoto) setPhoto(storedPhoto);
        if (storedPhotoBase64) setPhotoBase64(storedPhotoBase64);
      } catch (error) {
        console.log('Failed to load image from AsyncStorage:', error);
      }
    };
    loadImage();
  }, []);

  const handleChoosePhoto = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    }, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image.');
      } else {
        const { uri, base64 } = response.assets[0];
        console.log('Selected image URI:', uri);
        console.log('Selected image Base64:', base64);
        setPhoto(uri);
        setPhotoBase64(base64);
        try {
          await AsyncStorage.setItem('photo', uri);
          await AsyncStorage.setItem('photoBase64', base64);
        } catch (error) {
          console.log('Failed to save image to AsyncStorage:', error);
        }
      }
    });
  };

  const updateData = async () => {
    const data = {
      firstName: username,
      email: email,
      contactNumber: number,
      image: photoBase64,
    };

    console.log('Update data:', data);

    try {
      const response = await axiosInstance.put(`/updateUser/${user.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Update successful:", response.data);
      Alert.alert("Success", "Your profile has been updated successfully.");
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Not updated");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialIcons name={"arrow-back"} size={40} color={"#FFF"} onPress={() => navigation.navigate("ACOUNT")}/>
          <Text style={styles.profile}>Edit Profile</Text>
          <Entypo name={"share"} size={30} color={"#FFF"} />
        </View>

        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <View style={styles.photoWrapper}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : (
                <FontAwesome5 name={"camera"} size={30} color={"black"} />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.textStyle}>Change Picture</Text>
        </View>
      </View>
      <View style={styles.containers}>
        <Text style={styles.text}>Username</Text>
        <Feild value={username} onChangeText={setUsername} width={"88%"}/>
        <Text style={styles.text}>Email ID</Text>
        <Feild value={email} onChangeText={setEmail} width={"88%"}/>
        <Text style={styles.text}>Phone Number</Text>
        <Feild value={number} onChangeText={setNumber} width={"88%"}/>
      </View>
      
      <View style={styles.updateButton}>
        <Btn
          btnLabel="Update"
          bgColor="black"
          textColor="white"
          width={"65%"}
          Press={updateData}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  container: {
    backgroundColor: "#f7642e",
    height: "25%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  profile: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFF",
  },
  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "150%",
  },
  photoWrapper: {
    height: 180,
    width: 180,
    borderRadius: 90,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  photo: {
    height: "100%",
    width: "100%",
    borderRadius: 90,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "condensed",
    color: "black",
  },
  containers: {
    paddingLeft: 53,
    marginTop: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  updateButton: {
    paddingLeft: "25%",
    marginTop: "10%",
  }
});
