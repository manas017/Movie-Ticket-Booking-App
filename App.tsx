import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, StyleSheet, View } from 'react-native'
import Tabnvgtr from './src/navigators/Tabnvgtr'
import MovieDetailscreen from './src/screens/MovieDetailscreen'
import SeatBookingscreen from './src/screens/SeatBookingscreen'
import { Header } from 'react-native/Libraries/NewAppScreen'

const Stack=createNativeStackNavigator();
export default function App(){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Tab' component={Tabnvgtr} options={{animation:'default'}} />
          <Stack.Screen name='MovieDetails' component={MovieDetailscreen} options={{animation:'slide_from_right'}}/>
          <Stack.Screen name='SeatBooking' component={SeatBookingscreen} options={{animation:'slide_from_bottom'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


const styles = StyleSheet.create({})
