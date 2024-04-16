import React, { useState } from 'react'
import { Text, StyleSheet, View, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../theme'
import Appheader from '../components/Appheader'
import Seat from 'react-native-vector-icons/MaterialIcons'
import Radio from 'react-native-vector-icons/Ionicons'
import EncryptedStorage from 'react-native-encrypted-storage'
import { ToastAndroid } from 'react-native'
const timeArray=['11:30','12.45','2.15','4.30','6.00','7.45','9.00','10.45']
  
const datearray=()=>{
  const date =new Date()
  let localDate=[]
  let days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  for(i=0;i<7;i++){
  const tempDate={
    date:new Date(date.getTime()+i*24*60*60*1000).getDate(),
    day:days[new Date(date.getTime()+i*24*60*60*1000).getDay()]
  }
  localDate.push(tempDate)
  }
  return localDate
}

const generateseat=()=>{
  let numrows=8
  let numseats=3
  let rowWiseseatArr=[]
  let start=1
  for(i=0;i<numrows;i++){
    let columnwiseSeatArr=[]
    for(j=0;j<numseats;j++){
      let seatobject={
        seatno:start,
        selected:false,
        taken:Boolean(Math.round(Math.random()))
      }
      start++
      columnwiseSeatArr.push(seatobject)
    }
    if(i>=1 ){
      numseats=5
    }
    if(i>3 ){
      numseats=7
    }
    if(i>6 ){
      numseats=9
    }
    rowWiseseatArr.push(columnwiseSeatArr)
  }
  return rowWiseseatArr
}



export default function SeatBookingscreen({route,navigation}){
    let[price,Setprice]=useState(0)
    let[timefcs,Settimefcs]=useState()
    let[datefcs,Setdatefcs]=useState()
    let[selectedseatlist,Setselectedseatlist]=useState([])
    let[seatarr,Setseatarr]=useState(generateseat())
    let[datearr,Setdatearr]=useState(datearray())

    const selectseat=(index,subindex,num)=>{
      if(!seatarr[index][subindex].taken){
        let array=[...selectedseatlist]
        let temp=[...seatarr]
        temp[index][subindex].selected=!temp[index][subindex].selected
        if(!array.includes(num)){
          array.push(num)
          Setselectedseatlist(array)
        }else{
          const tempindex=array.indexOf(num)
          if(tempindex>-1){
          array.splice(tempindex,num)}
          Setselectedseatlist(array)
        }
        Setprice(array.length*349)
        Setseatarr(temp)
        console.log(selectedseatlist)
      }
      }

      const Bookseats=async()=>{
        if(selectedseatlist.length!==0 && timeArray[timefcs]!==undefined && datearr[datefcs]!==undefined){
          try{
              await EncryptedStorage.setItem('ticket',JSON.stringify({
                  seatArray:selectedseatlist,
                  time:timeArray[timefcs],
                  date:datearr[datefcs],
                  ticketImage:route.params.PosterImage
              }))
          }catch(error){
              console.error('Something went while booking seats',error)
          }
          navigation.navigate('Ticket', {
            seatArray: selectedseatlist,
            time: timeArray[timefcs],
            date: datearr[datefcs],
            ticketImage: route.params.PosterImage,
          });
        }else{
            ToastAndroid.showWithGravity('Please select Seats,Time and Date of the show correctly',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        }
      }
    // 
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar hidden/>
        <View>
          <ImageBackground source={{uri:route.params?.BgImage}} style={styles.bgImage}>
          <LinearGradient colors={[COLORS.BlackRGB10,COLORS.Black]} style={styles.ling}>
              <View style={{alignSelf:'flex-start',paddingHorizontal:15,position:'absolute',paddingTop:5}}>
                <Appheader action={()=>{navigation.goBack()}}/>
              </View>
          </LinearGradient>
          </ImageBackground>
          <Text style={styles.text}>Screen this side</Text>
        </View>
        <View style={styles.seatbx}>
          <View style={styles.seatgap}>
          {
            seatarr.map((item,index)=>{
              return(
                <View style={styles.seatrow}>
                    {
                      item.map((subitem,subindex)=>{
                        return(
                          <TouchableOpacity key={subitem.seatno} onPress={()=>selectseat(index,subindex,subitem.seatno)} >
                            <Seat name='event-seat' style={[styles.seaticn,subitem.selected?{color:COLORS.Orange}:{},subitem.taken?{color:COLORS.Grey}:{}]}/>
                          </TouchableOpacity>
                        )
                      })
                    }
                </View>
              )
            })
          }
          </View>
        </View>
        <View style={styles.radiobx}>
          <View style={{flexDirection:'row'}}>
                <Radio name='radio-button-on' style={styles.rdioicn}/>
                <Text style={styles.radiotxt}>Available</Text>
          </View>
          <View style={{flexDirection:'row'}}>
                <Radio name='radio-button-on' style={[styles.rdioicn,{color:COLORS.Grey}]}/>
                <Text style={styles.radiotxt}>Booked</Text>
          </View>
          <View style={{flexDirection:'row'}}>
                <Radio name='radio-button-on' style={[styles.rdioicn,{color:COLORS.Orange}]}/>
                <Text style={styles.radiotxt}>Selected</Text>
          </View>
        </View>
        <View>
          <FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:20}}
                     data={datearr} keyExtractor={(item)=>{item.date}}
                     renderItem={({item,index})=>{
                      return(
                      <TouchableOpacity onPress={()=>Setdatefcs(index)}>
                        <View style={[styles.datebx,index==0?{marginLeft:24}:index==datearray.length-1?{marginRight:24}:{},
                                         index==datefcs?{backgroundColor:COLORS.Orange}:{}]}>
                           <Text style={{color:'white',fontSize:24}}>{item.date}</Text>
                           <Text style={{color:COLORS.WhiteRGBA75,fontSize:12}}>{item.day}</Text>
                        </View>
                      </TouchableOpacity>
                      )}}/>
        </View>

        <View>
          <FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:20}}
                     data={timeArray} keyExtractor={(item)=>{item}}
                     renderItem={({item,index})=>{
                      return(
                      <TouchableOpacity onPress={()=>Settimefcs(index)} >
                        <View style={[styles.timebx,index==0?{marginLeft:24}:index==timeArray.length-1?{marginRight:24}:{},
                                         index==timefcs?{backgroundColor:COLORS.Orange,borderColor:COLORS.Orange}:{}]}>
                           <Text style={{color:'white',fontSize:14,fontWeight:600}}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                      )}}/>
        </View>

        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:7}}>
          <View>
            <Text style={{color:'white',fontSize:12,}}>Total Price</Text>
            <Text style={{color:'white',fontSize:24,fontWeight:600}}>Rs {price}</Text>
          </View>
          <TouchableOpacity  style={styles.bookbtnbox} onPress={Bookseats}>
            <Text  style={styles.bookbtn}>Book Tickets</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container:{display:'flex',flex:1,backgroundColor:'black'},
  bgImage:{width:'100%',aspectRatio:3072/1727},
  ling:{height: '100%',width:'100%',zIndex: 2,},
  text:{color:COLORS.WhiteRGBA75,textAlign:"center",fontSize:12},
  seatbx:{marginVertical:20},
  seatgap:{gap:20},
  seatrow:{flexDirection:'row',justifyContent:'center',gap:20},
  seaticn:{fontSize:20,color:'white'},
  radiobx:{display:'flex',width:'90%',flexDirection:'row',alignSelf:'center',justifyContent:'space-between'},
  radiotxt:{color:COLORS.White,fontSize:12},
  rdioicn:{size:'10',color:'white',paddingHorizontal:5},
  datebx:{width:70,height:60,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:COLORS.DarkGrey,marginVertical:10,marginTop:15},
  timebx:{width:70,height:40,borderRadius:30,justifyContent:'center',alignItems:'center',backgroundColor:COLORS.DarkGrey,marginVertical:10,borderWidth:1,borderColor:COLORS.Grey},
  bookbtn:{color:'white',padding:10,fontSize:20,fontWeight:'500'},
  bookbtnbox:{display:'flex',alignItems:'center',justifyContent:'center',width:150,height:50,borderRadius:15,backgroundColor:COLORS.Orange,marginTop:5}

})