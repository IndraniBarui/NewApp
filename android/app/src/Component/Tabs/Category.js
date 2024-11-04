import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Category = ({ item, select, setSelect }) => {
  
  return (
    <TouchableOpacity onPress={() => setSelect(item)}>
      <Text
        style={[
          styles.categoryText,
          select === item && {
            color: "#FFFFFF",
            backgroundColor: "#f78604",
          },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8e8d8c",
    backgroundColor: "#dbdad9",
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 28,
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
});
