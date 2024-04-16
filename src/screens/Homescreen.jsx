import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import { upcomingMovies,popularMovies,nowPlayingMovies,baseImagePath } from '../api/apicalls'
import { COLORS, SPACING } from '../theme'
import { StatusBar } from 'react-native'
import SearchComponent from '../components/SearchComponent'
import { useNavigation } from '@react-navigation/native'
import Categorytitle from '../components/categorytitle'
import MovieDetailscreen from './MovieDetailscreen'
import Movieslidercard from '../components/Movieslidercard'
import Mainmovieslider from '../components/Mainmovieslider'
const {height,width}=Dimensions.get('window')

const getUpcomingMovies=async()=>{
  try{
  let response=await fetch(upcomingMovies)
  let data=await response.json()
  return data;
  }
  catch(error){
    console.error('Something went wrong',error)
  }
}

const getPopularMovies=async()=>{
  try{
  let response=await fetch(popularMovies)
  let data=await response.json()
  return data;
  }
  catch(error){
    console.error('Something went wrong',error)
  }
}

const getnowPlayingMovies=async()=>{
  try{
  let response=await fetch(nowPlayingMovies)
  let data=await response.json()
  return data;
  }
  catch(error){
    console.error('Something went wrong',error)
  }
}
export default function Homescreen(){
  const[nowPlayingMovies,SetnowPlayingMovies]=useState(undefined)
  const[upcomingMovies,SetupcomingMovies]=useState(undefined)
  const[popularMovies,SetpopularMovies]=useState(undefined)
  const navigation=useNavigation();

  useEffect(()=>{
    (async()=>{
      let tempNowPlaying=await getnowPlayingMovies();
      SetnowPlayingMovies(tempNowPlaying.results)

      let tempUpcoming=await getUpcomingMovies();
      SetupcomingMovies(tempUpcoming.results)

      let tempopular=await getPopularMovies();
      SetpopularMovies(tempopular.results)
    })();
  },[])
  const SearchMoviefunction=(props)=>{
    navigation.navigate('Search')
  }
  if(nowPlayingMovies==null && nowPlayingMovies==undefined && upcomingMovies==null && upcomingMovies==undefined && popularMovies==null && popularMovies==undefined){
    return(
      <ScrollView bounces={false} style={styles.aibox} contentContainerStyle={styles.scrollvwbox}>
          <StatusBar hidden/>
          <View style={styles.srchbar}><SearchComponent  searchfunction={SearchMoviefunction}/></View>
          <View style={styles.aiInnerbox}><ActivityIndicator size={'large'} color={COLORS.Orange}/></View>
      </ScrollView>
    )
  }
    return (
      <ScrollView  style={styles.aibox} contentContainerStyle={styles.scrollvwbox}>
        <StatusBar hidden/>
        <View style={{marginVertical:20,marginHorizontal:10}}><SearchComponent  searchfunction={SearchMoviefunction}/></View>
        <Categorytitle title={'NOW PLAYING'}/>
        <FlatList  horizontal
             data={nowPlayingMovies}
             keyExtractor={(item)=>{item.id}} 
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{gap:SPACING.space_36}}
             renderItem={({item,index})=>(
              <Mainmovieslider shouldMarginatedAtEnd={true}
              cardFunction={()=>{navigation.push('MovieDetails',{movieid:item.id})}}
              title={item.original_title}
              imagePath={baseImagePath('w780',item.poster_path)}
              isFirst={index==0?true:false}
              isLast={index==upcomingMovies?.length-1?true:false}
              cardWidth={width*0.7}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}/>
            )}
        />
        <Categorytitle title={'POPULAR'}/>
        <FlatList  horizontal
             data={popularMovies}
             keyExtractor={(item)=>{item.id}} 
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{gap:SPACING.space_36}}
             renderItem={({item,index})=>(
              <Movieslidercard shouldMarginatedAtEnd={true}
              cardFunction={()=>{navigation.push('MovieDetails',{movieid:item.id})}}
              title={item.original_title} imagePath={baseImagePath('w342',item.poster_path)}
              isFirst={index==0?true:false}
              isLast={index==popularMovies.length-1?true:false}
              cardWidth={width/3}/>
            )}
        />
        <Categorytitle title={'UPCOMING'}/>
        <FlatList  horizontal
             data={upcomingMovies}
             keyExtractor={(item)=>{item.id}} 
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{gap:SPACING.space_36}}
             renderItem={({item,index})=>(
              <Movieslidercard shouldMarginatedAtEnd={true}
              cardFunction={()=>{navigation.push('MovieDetails',{movieid:item.id})}}
              title={item.original_title} imagePath={baseImagePath('w342',item.poster_path)}
              isFirst={index==0?true:false}
              isLast={index==upcomingMovies.length-1?true:false}
              cardWidth={width/3}/>
            )}
        />
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  scrollvwbox:{justifyContent:'center',display:'flex',backgroundColor:'black'},
  aibox:{backgroundColor:'black',display:'flex',flex:1},
  aiInnerbox:{display:'flex'},
  hs:{display:'flex',flex:1,backgroundColor:COLORS.Black},
  srchbar:{marginHorizontal:20,marginVertical:10,position:'absolute',top:10}

})
