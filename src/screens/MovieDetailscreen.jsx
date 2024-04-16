import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView,ActivityIndicator, ImageBackground, StatusBar, FlatList,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../theme'
import Appheader from '../components/Appheader'
import { baseImagePath, movieCastDetails, movieDetails } from '../api/apicalls'
import LinearGradient from 'react-native-linear-gradient'
import { Image } from 'react-native-elements'
import { FONTSIZE,SPACING } from '../theme'
import Clock from 'react-native-vector-icons/Feather'
import Star from 'react-native-vector-icons/AntDesign'
import Title from '../components/Title'
import Castcard from '../components/Castcard'
const genres={
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const getmovieData=async(movieid)=>{ 
  
  try{
    let resp=await fetch(movieDetails(movieid))
    let data=await resp.json()
    return data;
  }
  catch(error){
    console.error('Something went wrong',error)
  }
}

const getmovieCastData=async(movieid)=>{
  console.log(movieCastDetails(movieid))
  try{
    let resp=await fetch(movieCastDetails(movieid))
    let data=await resp.json()
    return data;
  }
  catch(error){
    console.error('Something went wrong',error)
  }
}

export default function MovieDetailscreen({route}){
  const[movieData,SetmovieData]=useState(undefined)
  const[movieCastData,SetmovieCastData]=useState(undefined)
  const navigation=useNavigation()
  // console.log(getmovieData(route.params.movieid))
  useEffect(()=>{
    (async()=>{
      const tempmovieData=await getmovieData(route.params.movieid)
      SetmovieData(tempmovieData)
    })();
    (async()=>{
      const tempmovieCastData=await getmovieCastData(route.params.movieid)
      SetmovieCastData(tempmovieCastData.cast)
    })()
  },[])

  if(movieData==null && movieData==undefined && movieCastData==null && movieCastData==undefined){
    return(
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent:'center'}} showsVerticalScrollIndicator={false}>
        <View></View>
        <View style={styles.aiInnerbox}><ActivityIndicator size={'large'} color={COLORS.Orange}/></View>
      </ScrollView>
    )
  }

    return (
      <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
        <StatusBar hidden/>
          <ImageBackground source={{uri:baseImagePath('w780',movieData?.backdrop_path)}} style={styles.imgbck} >
            <LinearGradient colors={[COLORS.BlackRGB10,COLORS.Black]} style={styles.ling}>
              <View style={{alignSelf:'flex-start',paddingHorizontal:15,position:'absolute',paddingTop:5}}>
                <Appheader action={()=>{navigation.goBack()}}/>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.cardimg}>
            <Image source={{uri:baseImagePath('w342',movieData?.poster_path)}} style={styles.imgposter} resizeMode='contain' />
          </View>
          <View style={styles.timebox}>
               <Clock name={'clock'} size={FONTSIZE.size_14} color={COLORS.Orange} style={styles.clockicn}/>
               <Text style={styles.runtime}>
                {Math.floor(movieData?.runtime/60)}h{' '}
                {Math.floor(movieData?.runtime%60)}m
               </Text>
          </View>
          <View style={styles.nametxtbx}>
            <Text style={styles.nametxt}>{movieData?.original_title}</Text>
          </View>

          <View style={styles.genrebox}>
            {
            movieData?.genres.map((item,index)=>{
              if(index>3){
                return}
                return(
                    <View style={styles.gentxtbx} key={item.id}>
                      <Text style={styles.gentxt} numberOfLines={1}>{item.name}</Text>
                    </View>
                )
            })
            }
          </View>
          <Text style={styles.tagline}>{movieData?.tagline}</Text>
          <View style={styles.vote}>
                <Star name='star' size={FONTSIZE.size_20} color={'yellow'} style={styles.icn}/>
                <Text style={styles.votetxt}>{movieData?.vote_average}</Text>
                <Text style={styles.votetxt}>({movieData?.vote_count})</Text>
                <Text style={{color:COLORS.WhiteRGBA75,paddingLeft:50}}>{movieData?.release_date}</Text>
          </View>
          <Text style={styles.descriptionText}>{movieData?.overview}</Text>
          <Text style={styles.casttitle}><Title title='Top Cast'/></Text>
          <FlatList
          horizontal
          data={movieCastData}
          keyExtractor={(item)=>item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap:SPACING.space_36}}
          renderItem={({item,index})=>(
            <Castcard shouldMarginatedAtEnd={true} cardWidth={80} isFirst={index==0?true:false}
              isLast={index==movieCastData?.length-1?true:false}
              imagePath={baseImagePath('w185',item.profile_path)} title={item.original_name}/>
    )}/>
    <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.push('SeatBooking', {
                BgImage: baseImagePath('w780', movieData.backdrop_path),
                PosterImage: baseImagePath('original', movieData.poster_path),
              });
            }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
         
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  aiInnerbox:{display:'flex',justifyContent:'center',alignItems:'center'},
  container:{backgroundColor:'black',display:'flex',flex:1},
  imgbck:{width:'100%',aspectRatio:3072 / 1727,zIndex:1},
  ling:{height: '100%',width:'100%',zIndex: 2,},
  cardimg:{width:'50%',position:'relative',alignSelf:'center',height:300,zIndex:1,top:-130},
  imgposter:{width:'100%',height:'100%'},
  timebox:{flexDirection:'row',width:'auto',alignSelf:'center',display:'flex',textAlign:'center'},
  clockicn:{textAlign:'center',position:'absolute',top:-120,right:12},
  runtime:{color:COLORS.WhiteRGBA50,position:'absolute',top:-120,},
  nametxtbx:{display:'flex',alignItems:'center',justifyContent:'center',position:'absolute',bottom:520,alignSelf:'center',},
  nametxt:{fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_4,
    textAlign: 'center',},
  genrebox:{flex:1,flexDirection:'row',gap:SPACING.space_10,justifyContent:'center',alignItems:'center',flexWrap:'nowrap',bottom:33},
  gentxt:{color:COLORS.WhiteRGBA75,fontSize:13},
  gentxtbx:{borderWidth:1,borderRadius:20,borderColor:COLORS.Grey,padding:15,margin:5,},
  tagline:{color:COLORS.White,fontSize:FONTSIZE.size_18,textAlign:"center",bottom:25},
  vote:{alignSelf:'flex-start',marginTop:10,flexDirection:'row',justifyContent:'center',bottom:25,paddingHorizontal:10},
  votetxt:{color:COLORS.WhiteRGBA75,marginHorizontal:3},
  icn:{marginHorizontal:6},
  descriptionText:{color:COLORS.WhiteRGBA75,width:'90%',fontSize:FONTSIZE.size_14,alignSelf:'center',},
  casttitle:{alignSelf:'flex-start',paddingHorizontal:20,margin:5},
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: 30,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
})