import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../Header";
import CartCard from "./CartCard";
import { CartContext } from "../../Context/CartContext";

const CartScreen = () => {
    const {carts,totalPrice,deleteItem} = useContext(CartContext)
  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header isCart={true} />
      </View>

      <FlatList
        data={carts}
        ListHeaderComponent={<></>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingBottom:100
        }}
        renderItem={({item})=><CartCard item={item}
        deleteCart={deleteItem}/>}
        ListFooterComponent={
          <>
            <View style={styles.priceContainer}>
              <View style={styles.priceAndTitle}>
                <Text style={styles.title}>Total:</Text>
                <Text style={styles.title}>${totalPrice}</Text>
              </View>
              <View style={styles.priceAndTitle}>
                <Text style={styles.title}>Shopping:</Text>
                <Text style={styles.title}>$0.0</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceAndTitle}>
              <Text style={styles.title}>Grand Total:</Text>
              <Text
                style={[styles.title, { color: "black", fontWeight: "700" }]}
              >
                ${totalPrice}
              </Text>
            </View>
          </>
        }
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#8c8989",
  },
  priceContainer: {
    marginTop: 40,
  },
  priceAndTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#d8dfe2",
    marginVertical: 10,
  },
  button: {
    padding: 15,
    backgroundColor: "#ec614a",
    borderRadius: 30,
    margin: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
