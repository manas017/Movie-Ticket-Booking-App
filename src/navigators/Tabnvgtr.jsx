import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Homescreen from '../screens/Homescreen'
import Searchcreen from '../screens/Searchscreen'
import Ticketscreen from '../screens/Ticketscreen'
import UserAccountscreen from '../screens/UserAccountscreen'
import { COLORS,FONTSIZE,SPACING } from '../theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Fontisto'
import Icon4 from 'react-native-vector-icons/Feather'
const Tab=createBottomTabNavigator()
export default function Tabnvgtr(){
    return (
      <Tab.Navigator 
      screenOptions={{headerShown:false,
                    tabBarHideOnKeyboard:true,
                    tabBarStyle:{
                        backgroundColor:COLORS.Black,
                        borderTopWidth:0,
                        height:SPACING.space_10*10,
                    },
                    tabBarShowLabel:false}}>
        <Tab.Screen name='Home' component={Homescreen} 
                    options={{tabBarIcon:({focused,color,size})=>{
                        return <View style={focused?styles.activetabBcg:null}><Icon  name='video-vintage' size={FONTSIZE.size_30} color={COLORS.White}/></View>
                    }}}/>
        <Tab.Screen name='Search' component={Searchcreen}
        options={{tabBarIcon:({focused,color,size})=>{
            return <View style={focused?styles.activetabBcg:null}><Icon2  name='search1' size={FONTSIZE.size_30} color={COLORS.White}/></View>
        }}}/>
        <Tab.Screen name='Ticket' component={Ticketscreen}
        options={{tabBarIcon:({focused,color,size})=>{
            return <View style={focused?styles.activetabBcg:null}><Icon3  name='ticket' size={FONTSIZE.size_30} color={COLORS.White}/></View>
        }}}/>
        <Tab.Screen name='User' component={UserAccountscreen}
        options={{tabBarIcon:({focused,color,size})=>{
            return <View style={focused?styles.activetabBcg:null}><Icon4  name='user' size={FONTSIZE.size_30} color={COLORS.White}/></View>
        }}}/>
      </Tab.Navigator>
    )
  }


const styles = StyleSheet.create({
    activetabBcg:{backgroundColor:COLORS.Orange,padding:SPACING.space_10,borderRadius:SPACING.space_10*10}
})
