import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./android/app/src/Component/Tabs/HomeScreen";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "./android/app/src/Component/Tabs/ProductDetails";
import CartScreen from "./android/app/src/Component/Tabs/CartScreen";
import {
  CartContext,
  CartProvider,
} from "./android/app/src/Context/CartContext";
import Login from "./android/app/src/Component/Login/Login";
import LoginPage from "./android/app/src/Component/Login/LoginPage";
import SignUp from "./android/app/src/Component/Login/SignUp";
import Profile from "./android/app/src/Component/Tabs/profile/Profile";
import EditProfile from "./android/app/src/Component/Tabs/profile/EditProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from 'react-redux';
import Store from "./android/app/src/Component/Redux/Store";
import Item from "./android/app/src/Component/Items/Item"
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
     
      <Stack.Screen name="LoginPage" component={LoginPage} />

     
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HOME"
    >
      {/* <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUp} /> */}
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetails} />
      <Stack.Screen name="ACOUNT" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Items" component={Item} />
      
    </Stack.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  // if (!isAuthenticated) {
  //   return (
  //     <NavigationContainer>
  //       <AuthStack />
  //     </NavigationContainer>
  //   );
  // }

  return (
    <Provider store={Store}>
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "red",
          }}
        >
          <Tab.Screen
            name="Login"
            component={AuthStack}
            options={{
              tabBarStyle: { display: "none" },
              tabBarIcon: () => null,
              tabBarVisible: false,
            }}
          />
         
          <Tab.Screen
            name="HOME_STACK"
            component={MainStack}
            options={{
              tabBarIcon: ({ size, color }) => {
                return <Entypo name={"home"} size={size} color={color} />;
              },
            }}
          />
          <Tab.Screen
            name="REORDER"
            component={Item}
            options={{
              tabBarIcon: ({ size, color }) => {
                return (
                  <MaterialIcons name={"reorder"} size={size} color={color} />
                );
              },
            }}
          />
          <Tab.Screen
            name="CART"
            component={CartScreen}
            options={{
              tabBarIcon: ({ size, color }) => {
                const { carts } = useContext(CartContext);
                return (
                  <View style={{ position: "relative" }}>
                    <FontAwesome
                      name={"shopping-cart"}
                      size={size}
                      color={color}
                    />
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        backgroundColor: color,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: -15,
                        right: -7,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        {carts?.length}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="ACOUNT"
            component={Profile}
            options={{
              tabBarIcon: ({ size, color }) => {
                return (
                  <MaterialCommunityIcons
                    name={"account"}
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
    </Provider>
  );
};

export default App;
