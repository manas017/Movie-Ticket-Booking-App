import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity,Image, ScrollView } from 'react-native'
import { COLORS, FONTSIZE, SPACING } from '../theme'
import Star from 'react-native-vector-icons/AntDesign'
export default function Mainmovieslider(props){
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
    return (
      <TouchableOpacity onPress={()=>{props.cardFunction()}}>
        <View style={[styles.container,
        props.shouldMarginatedAtEnd
           ?props.isFirst
              ?{marginLeft:SPACING.space_36}
           :props.isLast
              ?{marginRight:SPACING.space_36}
           :{}
          :{},
          props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
          {maxWidth: props.cardWidth},
          ]}>
          <Image source={{uri:props.imagePath}} style={[styles.img,{width:props.cardWidth}]}/>
          <View style={styles.vote}>
                <Star name='star' size={FONTSIZE.size_20} color={'yellow'} style={styles.icn}/>
                <Text style={styles.votetxt}>{props.vote_average}</Text>
                <Text style={styles.votetxt}>({props.vote_count})</Text>
          </View>
          <Text style={styles.txt} numberOfLines={1}>{props.title}</Text>
          <View style={styles.genrebox}>
            {
            props.genre.map((item,index)=>{
                if(index>1){return}
                return(
                    <View style={styles.gentxtbx}><Text style={styles.gentxt}>{genres[item]}</Text></View>
                )
            })
            }
          </View>
       
        </View>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
  container:{display:'flex',flex:1,backgroundColor:'black'},
  img:{aspectRatio:2/3,borderRadius:20},
  txt:{color:COLORS.White,fontSize:FONTSIZE.size_18,textAlign:'center',paddingVertical:SPACING.space_10,fontWeight:'bold'},
  vote:{alignSelf:'center',marginTop:10,flexDirection:'row',justifyContent:'center'},
  votetxt:{color:COLORS.WhiteRGBA75,marginHorizontal:3},
  icn:{marginHorizontal:6},
  genrebox:{flex:1,flexDirection:'row',gap:SPACING.space_10,justifyContent:'center',alignItems:'center',flexWrap:'wrap',width:'90%'},
  gentxt:{color:COLORS.WhiteRGBA75,fontSize:13,textAlign:'center'},
  gentxtbx:{borderWidth:1,borderRadius:20,borderColor:COLORS.Grey,padding:10,margin:5}
})
