import React  from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { COLORS, FONTSIZE } from '../theme'

export default function Title({title}){
    return (
      <View >
        <Text style={styles.txt}>{title}</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
    txt:{fontSize:FONTSIZE.size_20,color:COLORS.White,fontWeight:'500'},
    
})
