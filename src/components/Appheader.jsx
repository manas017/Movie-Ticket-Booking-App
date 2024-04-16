import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Cross from 'react-native-vector-icons/AntDesign'
import { COLORS, FONTSIZE } from '../theme'
export default function Appheader(props){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>props.action()}>
            <Cross name={'closecircle'} size={FONTSIZE.size_24} color={COLORS.Orange} />
        </TouchableOpacity>
        <Text style={styles.txt}>{props.txt}</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
    container:{display:'flex',flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'},
    txt:{fontSize:24,textAlign:'center',color:COLORS.White,marginHorizontal:90,marginTop:10,fontWeight:'400'}
})


