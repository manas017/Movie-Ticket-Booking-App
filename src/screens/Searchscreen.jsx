import React, { useState } from 'react'
import { Text, StyleSheet, View, ScrollView ,StatusBar,Dimensions,FlatList} from 'react-native'
import { searchMovies,baseImagePath } from '../api/apicalls'
import Movieslidercard from '../components/Movieslidercard'
import SearchComponent from '../components/SearchComponent'
import { useNavigation } from '@react-navigation/native'
import { SPACING } from '../theme'
const {height,width}=Dimensions.get('window')
export default function Searchcreen(){
    let [searchlist,Seatsearchlist]=useState([])
    const getsearchlist=async(name)=>{
    try{
      let resp=await fetch(searchMovies(name))
      let data= await resp.json()
      Seatsearchlist(data.results)
    }
    catch(error){
      console.error('Something went wrong',error)
    }
  }

  const navigation=useNavigation()
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
       
        <FlatList 
             data={searchlist}
             keyExtractor={(item)=>{item.original_title}} 
             numColumns={2}
             contentContainerStyle={{gap:SPACING.space_36,alignItems:'center',paddingHorizontal:10}}
             showsVerticalScrollIndicator={false}
             ListHeaderComponent={
              <View style={{marginVertical:20,marginHorizontal:5}}><SearchComponent searchfunction={getsearchlist} /></View>
          }
             renderItem={({item,index})=>(
              <Movieslidercard shouldMarginatedAtEnd={false} shouldMarginatedAround={true}
              cardFunction={()=>{navigation.navigate('MovieDetails',{movieid:item.id})}}
              title={item.original_title} imagePath={baseImagePath('w500',item.poster_path)}
              cardWidth={width / 2 - SPACING.space_12 * 3} id={(item)=>{item.id}}/>
            )}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container:{backgroundColor:'black',display:'flex',flex:1,alignItems:'center'},
 
})