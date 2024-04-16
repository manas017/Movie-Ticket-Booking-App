import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { COLORS, FONTSIZE, SPACING } from '../theme'

export default function Categorytitle({title}){
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
  title:{color:COLORS.White,fontSize:FONTSIZE.size_20,paddingHorizontal:SPACING.space_32,paddingVertical:SPACING.space_28}
})