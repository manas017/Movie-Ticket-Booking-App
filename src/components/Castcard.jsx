import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Image } from 'react-native-elements'
import { COLORS, SPACING,FONTSIZE } from '../theme'
export default function Castcard(props){
    return (
        <View style={[styles.container,
            props.shouldMarginatedAtEnd
               ?props.isFirst
                  ?{marginLeft:SPACING.space_24}
               :props.isLast
                  ?{marginRight:SPACING.space_24}
               :{}
              :{},
              props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
              {maxWidth: props.cardWidth},
              ]} key={props.id}>
        <Image source={{uri:props.imagePath}} style={[styles.castimg,{width:props.cardWidth}]}/>
        <Text style={styles.txt1} >{props.title}</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
    container:{alignSelf:'center'},
    castimg: {
        aspectRatio: 1920 / 2880,
        borderRadius: 25,
      },
      txt1: {
        alignSelf: 'stretch',
        fontSize: FONTSIZE.size_12,
        color: COLORS.White,
        paddingVertical:5,textAlign:'center'
      },
})
