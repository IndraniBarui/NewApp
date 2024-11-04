import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './android/app/src/Component/Tabs/HomeScreen'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createBottomTabNavigator()
function Home (){
  return (
    <View>
      <Text>Homes</Text>
    </View>
  )
}
const BottomNavbar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false,
        tabBarActiveTintColor:"red"
      }}>
        <Tab.Screen name ="HOME" component={HomeScreen} options={{tabBarIcon:({size, focused,color})=>{
          return <Entypo name={"home"} size={size} color={color}/>
        }}}/>
        <Tab.Screen name ="REORDER" component={Home}
        options={{tabBarIcon:({size,color})=>{
          return <MaterialIcons name={"reorder"} size={size} color={color}/>
        }}}/>
        <Tab.Screen name ="CART" component={Home}
        options={{tabBarIcon:({size,color})=>{
          return <FontAwesome name={"shopping-cart"} size={size} color={color}/>
        }}}/>
        <Tab.Screen name ="ACOUNT" component={Home}
         options={{tabBarIcon:({size,color})=>{
          return <MaterialCommunityIcons name={"account"} size={size} color={color}/>
        }}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomNavbar


const styles = StyleSheet.create({})