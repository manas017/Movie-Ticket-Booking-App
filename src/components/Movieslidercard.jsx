import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity,Image, ScrollView } from 'react-native'
import { COLORS, FONTSIZE, SPACING } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function Movieslidercard(props){
  const navigation=useNavigation()
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
          ]} key={props.id}>
          <Image source={{uri:props.imagePath}} style={[styles.img,{width:props.cardWidth}]}/>
        <Text style={styles.txt} numberOfLines={1}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
  container:{display:'flex',flex:1,backgroundColor:'black'},
  img:{aspectRatio:2/3,borderRadius:20},
  txt:{color:COLORS.White,fontSize:FONTSIZE.size_14,textAlign:'center',paddingVertical:SPACING.space_10},
})
