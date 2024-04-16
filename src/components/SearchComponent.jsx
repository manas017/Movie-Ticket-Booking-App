import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { COLORS } from '../theme'
import SearchIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'


export default function SearchComponent(props){
    let[searchtxt,Setsearchtxt]=useState('')
    let navigation=useNavigation();
    // const searchfnction=()=>{
    //     navigation.navigate('Home')
    // }
    return (
      <View style={styles.srchcontainer}>
        <TextInput style={styles.inpbx} placeholder='Search your Movies' placeholderTextColor={COLORS.Grey} value={searchtxt} onChangeText={Setsearchtxt}/>
        <View style={styles.srchicon}>
            <TouchableOpacity onPress={()=>{props.searchfunction(searchtxt)}}><SearchIcon name='search1' size={25} color={COLORS.Orange}/></TouchableOpacity>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    inpbx:{borderColor:COLORS.Grey,paddingHorizontal:20,borderTopLeftRadius:30,borderBottomLeftRadius:30,borderTopWidth:1,
           borderBottomWidth:1,borderLeftWidth:1,color:'white',width:'85%'},
    srchcontainer:{flexDirection:'row',alignSelf:'center'},
    srchicon:{color:'white',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1,borderBottomRightRadius:30,
              borderTopRightRadius:30,borderColor:COLORS.Grey,padding:10,paddingHorizontal:15}
})
