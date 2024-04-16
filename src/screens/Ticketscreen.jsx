import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, StatusBar, ImageBackground } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage'
import Appheader from '../components/Appheader'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../theme'
import Clock from 'react-native-vector-icons/AntDesign'
import { Image } from 'react-native-elements'
export default function Ticketscreen({route,navigation}){
  let[ticketData,SetticketData]=useState(route.params)

  useEffect(()=>{
    (async()=>{
      try{
        const ticket=-await EncryptedStorage.getItem('ticket')
        if(ticket!==undefined && ticket!==null){
          SetticketData(JSON.parse(ticket))
        }
      }catch(error){
        console.error('Ticket data not recieved',error)
      }
    })
  },[])

  if (ticketData !== route.params && route.params != undefined) {
    SetticketData(route.params);
  }
  
  if(ticketData==null || ticketData==undefined){
    return(
      <View style={styles.container}>
        <StatusBar hidden/>
        <View style={{alignSelf:'flex-start',paddingHorizontal:15,position:'absolute',paddingTop:5}}>
                <Appheader action={()=>{navigation.goBack()}} txt={'My Tickets'}/>
        </View>
      </View>
    )
  }
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <View style={{alignSelf:'center',paddingHorizontal:25,position:'absolute',marginVertical:10,top:-15}}>
                <Appheader action={()=>{navigation.goBack()}} txt={'My Tickets'}/>
        </View>
        <View style={styles.ticketbox}>
            <ImageBackground source={{uri:ticketData?.ticketImage}} style={styles.ticketImage}>
              <LinearGradient colors={[COLORS.OrangeRGBA0,COLORS.Orange]} style={styles.ling}>
              <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
              </LinearGradient>
            </ImageBackground>
           <View style={styles.linear}></View>
           <View style={styles.Footer}>
           <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{ticketData?.date.date}</Text>
                <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
              </View>
              <View>
                <Clock name='clockcircleo' style={styles.clockIcon}/>
                <Text style={styles.subtitle}>{ticketData?.time}</Text>
              </View>
            </View>
            <View style={styles.ticketSeatContainer}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>Hall</Text> 
                <Text style={styles.subtitle}>No.4</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>Row</Text>
                <Text style={styles.subtitle}>C</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>Seats</Text>
                <Text style={styles.subtitle}>    
                    {ticketData?.seatArray.map((item,index,arr)=>{
                      if(index>3){
                        return
                      }
                      return(
                        item + ','
                      )
                    })}
                </Text>
              </View>
              </View>
              <Image source={require('../assets/barcode.png')} style={styles.brcode}/>
            
          </View>
        </View>

      </View>
    )
}

const styles = StyleSheet.create({
  container:{display:'flex',flex:1,alignItems:'center',backgroundColor:'black'},
  ticketbox:{flex:1,alignItems:'center',marginTop:60},
  ticketImage:{width:300,aspectRatio:200/300,borderTopLeftRadius:25,borderTopRightRadius:25,alignSelf:'center',overflow:'hidden',justifyContent:'flex-end'},
  ling:{height:'70%'},
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  Footer: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: 36,
    alignSelf: 'center',
    borderBottomLeftRadius:25,
    borderBottomRightRadius: 25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.White,
  },
  title: {
    fontSize: 18,
    color: COLORS.White,
  },
  clockIcon: {
    fontSize: 24,
    color: COLORS.White,
    paddingBottom: 10,
  },
  brcode: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
})