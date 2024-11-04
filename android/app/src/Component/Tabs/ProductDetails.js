import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CartContext } from "../../Context/CartContext";
import BottomSheet from "react-native-simple-bottom-sheet";
import SlidingUpPanel from 'rn-sliding-up-panel';
import Entypo from "react-native-vector-icons/Entypo"
const sizes = ["S", "M", "L", "XL", "XXL"];
const colorArray = [
  "#c8c6c6",
  "#2343eb",
  "#ebea23",
  "#3deb23",
  "#eb7a23",
  "#121212",
];
const ProductDetails = () => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const { addTocart } = useContext(CartContext);
  const route = useRoute();
  const item = route.params.item;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const panelRef = useRef(null);
  const openBottomSheet = () => {
    // setIsBottomSheetOpen(true);
    bottomSheetRef.current.show();
  };

  const closeBottomSheet = () => {
    // setIsBottomSheetOpen(false);
    bottomSheetRef.current.hide();
  };
  
  const handleAddToCart = (item) => {
    if (selectedSize === null) {
      // Alert.alert("Please select a size before adding to cart.");
      // return;

      openBottomSheet(item);
      return;
    }
    (item.size = selectedSize), (item.color = selectedColor), addTocart(item);
    navigation.navigate("CART");
  };
  const handleAddToCart1 = (item) => {
    (item.size = selectedSize), (item.color = selectedColor), addTocart(item);
    navigation.navigate("CART");
    closeBottomSheet()
  };

  return (
    <ScrollView style={{flex:1}}>
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Text style={[styles.title, styles.sizeText]}>Size</Text>
      <View style={styles.SizeContainer}>
        {sizes.map((size, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.sizeValueContainer}
              onPress={() => {
                setSelectedSize(size);
              }}
            >
              <Text
                style={[
                  styles.SizeValue,
                  selectedSize == size && {
                    color: "#f6714a",
                  },
                ]}
              >
                {" "}
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={[styles.title, styles.colorText]}>Colors</Text>
      <View style={styles.colorContainer}>
        {colorArray.map((color, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedColor(color);
              }}
              style={[
                styles.circleBorder,
                selectedColor == color && {
                  borderColor: color,
                  borderWidth: 2,
                },
              ]}
            >
              <View style={[styles.circle, { backgroundColor: color }]}></View>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => {
          handleAddToCart(item);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      
      <SlidingUpPanel ref={bottomSheetRef} draggableRange={{ top: 300, bottom: 0 }} showBackdrop={false} height={300} allowDragging={false}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.SizeContainer}>
          <TouchableOpacity onPress={closeBottomSheet}>
            {/* <Text style={styles.closeButtonText}>Close</Text> */}
            <Entypo name={"cross"} size={40} color={"#b3babd"}/>
          </TouchableOpacity>
          <Text style={styles.selectSize}>Select Size</Text>
          </View>
          <View style={{borderBottomWidth:1, backgroundColor:"#b3babd", marginVertical:10}}></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingVertical:20}}>
          {sizes.map((size, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.sizeValueContainer}
                    onPress={() => {
                      setSelectedSize(size);
                    }}
                  >
                    <Text
                      style={[
                        styles.SizeValue,
                        selectedSize == size && {
                          color: "#f6714a",
                        },
                      ]}
                    >
                      {" "}
                      {size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
             
          </ScrollView>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
        onPress={() => {
          handleAddToCart1(item);
        }}
        style={[styles.buttons, !selectedSize && styles.disabledButton]}
        disabled={!selectedSize}
      >
        <Text style={styles.buttonTexts}>Continue</Text>
      </TouchableOpacity>
      </View>
        </View>
      </SlidingUpPanel>
    </LinearGradient>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    padding: 20,
  },
  coverImage: {
    width: "100%",
    height: 380,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    color: "#504f4f",
  },
  price: {
    fontSize: 25,
    fontWeight: "600",
    color: "#8a8989",
  },
  sizeText: {
    marginHorizontal: 20,
  },
  SizeContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  sizeValueContainer: {
    height: 36,
    width: 48,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  SizeValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  colorText: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  colorContainer: {
    flexDirection: "row",
    marginHorizontal: 20,

    // alignItems:"center"
  },
  circle: {
    height: 36,
    width: 36,
    borderRadius: 20,
    // marginHorizontal:10,
  },
  circleBorder: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  
  button: {
    padding: 10,
    backgroundColor: "#ec614a",
    margin: 10,
    borderRadius: 20,

  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  closeButton: {
    padding: 16,
    backgroundColor: "#f6714a",
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  closeButtonText: {
    color: "#fff",
  },
  bottomSheetContainer: {
    flex: 1,
    // padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    padding: 16,
    backgroundColor: '#f6714a',
    borderRadius: 4,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  SizeContainer:{
    flexDirection: "row",
  },
  selectSize:{
    fontSize:25,
    fontWeight:"500",
    paddingHorizontal:40,
    color:"black",
    paddingVertical:3
  },
  buttonContainer:{
    marginTop: 50, 
    marginBottom: 50, 
    alignItems: 'center',
  },
  buttons: {
    padding: 10,
    backgroundColor: "#ec614a",
    margin: 10,
    borderRadius: 20,
width:"90%",
height:50
  },
  buttonTexts: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});
