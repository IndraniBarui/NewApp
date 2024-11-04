import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from '../../screen';
import Home from '../Home';
import IMAGES from '../../Assets';
const Tab = createBottomTabNavigator
const NavBar = () => {
  return (
    // <View>
    //   <Text>NavBar</Text>
    // </View>
    <Stack.Navigator>
<Stack.Screen name={SCREENS.HOME} component={Tabnavigator}/>
    </Stack.Navigator>
  )
}

const Tabnavigator = ()=>{
  return <Tab.Navigator initialRouteName={SCREENS.HOME}>
<Tab.Screen name={SCREENS.HOME}
component={Home}
options={{
  title:'Home',
  tabBarIcon :({focused})=>(
<Image source={IMAGES.HOME}
style ={{height:30, width:30}}
/>
  )
  }}
/>
  </Tab.Navigator>
}

export default NavBar

const styles = StyleSheet.create({})