import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState,useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
const Profile = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const [resource_id, setResource_Id] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const storedPhoto = await AsyncStorage.getItem('photo');
        if (storedPhoto) {
          setPhoto(storedPhoto);
        }
      } catch (error) {
        console.log('Failed to load image from AsyncStorage:', error);
      }
    };
    loadImage();
  }, []);
  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login"); // Navigate to login screen
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const userData = await AsyncStorage.removeItem("token");
      setResource_Id(userData);
    } catch (error) {
      console.log(error);
    }
  };
  getUser();
  let ss = AsyncStorage.getItem("token");

  console.log(
    resource_id,
    user.image,
    "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
  );
  return (
    // <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <MaterialIcons
              name={"arrow-back"}
              size={40}
              color={"#FFF"}
              onPress={() => navigation.navigate("HOME")}
            />
          </TouchableOpacity>
          <Text style={styles.profile}>Profile</Text>
          <FontAwesome5 name={"bell"} size={30} color={"#FFF"} />
        </View>

        <View style={styles.photoContainer}>
         
            <View style={styles.photoWrapper}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <Text style={styles.photoPlaceholder}>No Image Available</Text>
            )}
            </View>
         
          <View style={styles.editContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.text}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.paymentsContainer}>
          <Text style={styles.textStyle}>My payments</Text>
        </View>
        <View style={styles.bankContainer}>
          <MaterialCommunityIcons
            name={"bank-outline"}
            size={30}
            color={"black"}
          />

          <Text style={styles.payment}>Bank & payments details</Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        <View style={styles.bankContainer}>
          <MaterialCommunityIcons
            name={"cash-refund"}
            size={30}
            color={"black"}
          />

          <Text style={styles.refund}>Payment & refund</Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        <View style={styles.paymentsContainer}>
          <Text style={styles.textStyle}>My activity</Text>
        </View>
        <View style={styles.bankContainer}>
          <AntDesign name={"heart"} size={30} color={"red"} />

          <Text style={styles.wishlist}>Wishlisted products</Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        <View style={styles.bankContainer}>
          <AntDesign name={"sharealt"} size={30} color={"black"} />
          <Text style={styles.refund}>Shared products</Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        <View style={styles.paymentsContainer}>
          <Text style={styles.textStyle}>Others</Text>
        </View>
        <View style={styles.bankContainer}>
          <MaterialCommunityIcons
            name={"bank-outline"}
            size={30}
            color={"black"}
          />

          <Text
            style={{
              fontSize: 20,
              color: "black",
              alignItems: "center",
              paddingRight: 100,
              fontWeight: "bold",
              marginBottom: 9,
            }}
          >
            Community
          </Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        {/* <View style={styles.bankContainer}>
          <MaterialIcons
            name={"dark-mode"}
            size={30}
            color={"black"}
          />

          <Text style={{
            fontSize: 20,
            color: "black",
            alignItems: "center",
            paddingRight: 100,
            fontWeight: "bold",
            marginBottom: 9,
          }}>Dark mode</Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View> */}
        <View style={styles.bankContainer}>
          <MaterialCommunityIcons
            name={"cash-refund"}
            size={30}
            color={"black"}
          />

          <Text
            style={{
              fontSize: 20,
              color: "black",
              alignItems: "center",
              paddingRight: 70,
              fontWeight: "bold",
              marginBottom: 9,
            }}
          >
            legal & policies
          </Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        <View style={styles.bankContainer}>
          <AntDesign name={"staro"} size={30} color={"black"} />

          <Text
            style={{
              fontSize: 20,
              color: "black",
              alignItems: "center",
              paddingRight: "35%",
              fontWeight: "bold",
              marginBottom: 9,
            }}
          >
            Ratings
          </Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        <View style={styles.bankContainer}>
          <AntDesign name={"setting"} size={30} color={"black"} />
          <Text
            style={{
              fontSize: 20,
              color: "black",
              alignItems: "center",
              paddingRight: "35%",
              fontWeight: "bold",
              marginBottom: 9,
            }}
          >
            Settings
          </Text>
          <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
        </View>
        <View style={styles.bankContainer}>
          <MaterialCommunityIcons name={"logout"} size={30} color={"black"} />

          <Text
            style={{
              fontSize: 20,
              color: "black",
              alignItems: "center",
              paddingRight: "35%",
              fontWeight: "bold",
              marginBottom: 9,
            }}
          >
            Logout
          </Text>
          <TouchableOpacity onPress={handleLogOut}>
            <SimpleLineIcons name={"arrow-right"} size={25} color={"black"} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
    height: 1000,
  },
  container: {
    backgroundColor: "#f7642e",
    height: "25%",

    // flex:1,
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
    borderRadius: 50,
  },
  photoPlaceholder: {
    color: "#888",
    textAlign: "center",
  },
  editContainer: {
    height: "13%",
    backgroundColor: "black",
    width: "40%",
    marginLeft: 10,
    borderRadius: 15,
    marginTop: 13,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    alignItems: "center",
    paddingLeft: 30,
    marginTop: 10,
  },
  paymentsContainer: {
    height: "19%",
    width: "100%",
    backgroundColor: "#e6e6eb",
    marginTop: 0,
  },
  textStyle: {
    fontSize: 20,
    color: "black",
    alignItems: "center",
    paddingLeft: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  bankContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingRight: 10,
    paddingTop: 10,
  },
  payment: {
    fontSize: 20,
    color: "black",
    alignItems: "center",
    paddingLeft: 10,
    fontWeight: "bold",
    marginBottom: 9,
  },
  refund: {
    fontSize: 20,
    color: "black",
    alignItems: "center",
    paddingRight: 50,
    fontWeight: "bold",
    marginBottom: 9,
  },
  wishlist: {
    fontSize: 20,
    color: "black",
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 9,
    marginRight: 30,
  },
});
