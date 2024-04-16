import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { COLORS } from '../theme';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
export default function Setting(props){
  return (
    <View style={styles.container}>
      <View>
        <Icon name={props.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <Icon2 name={'arrow-right'} style={styles.iconStyle} />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: 24,
    paddingHorizontal: 20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {

    fontSize:18,
    color: COLORS.White,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.WhiteRGBA15,
  },
});