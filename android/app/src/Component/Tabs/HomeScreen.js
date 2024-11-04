import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../Header";
import axiosInstance from "../../axiosIntance";
import { useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
const HomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const getItems = async () => {
    try {
      const response = await axiosInstance.get(`/get_items/${user.id}`);
      if (response.status === 200) {
        setData(response.data.data.images);
      }
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const editItems = async (itemId) => {
    const data = {
      title: title,
      description: description,
    };
    try {
      const response = await axiosInstance.put(
        `/update_items/${user.id}/images/${itemId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "Your profile has been updated successfully.");
    } catch (error) {
      Alert.alert("Error", "Not updated");
    }
  };

  const deleteItems = async (itemId) => {
    try {
      const response = await axiosInstance.delete(
        `/delete_items/${user.id}/images/${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "Your profile has been updated successfully.");
    } catch (error) {
      Alert.alert("Error", "Not updated");
    }
  };

  const wishItems = async (itemId) => {
    const json = JSON.stringify({
      imageId: itemId,
    });
    try {
      const response = await axiosInstance.post(
        `/wishList_items/${user.id}`,
        json
      );

      if (response.status === 201) {
        setWishlistedItems((prev) => [...prev, itemId]);
        Alert.alert("Data wishlisted");
      }
    } catch (error) {
      console.log(error);
      alert("Error", "Failed to create account. Please try again.");
    }
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.inputContainer}>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => editItems(item._id)}>
                <Feather name={"edit"} size={30} color={"red"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItems(item._id)}>
                <AntDesign name={"delete"} size={30} color={"red"} />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.description}>{item.price}</Text>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              onError={() => console.log("Image failed to load:", item.url)}
            />
            <TouchableOpacity onPress={() => wishItems(item._id)}>
              {wishlistedItems.includes(item._id) ? (
                <>
                  <AntDesign name={"hearto"} size={30} color={"red"} />
                </>
              ) : (
                <>
                  <AntDesign name={"heart"} size={30} color={"red"} />
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
