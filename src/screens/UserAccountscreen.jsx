import React from 'react'
import { Text, StyleSheet, View,StatusBar,Image } from 'react-native'
import { COLORS } from '../theme';
import Setting from '../components/Setting';
import Title from '../components/Title';
export default function UserAccountscreen(){
    return (
      <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <Title title={'User Account'}/>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText}>John Doe</Text>
      </View>

      <View style={styles.profileContainer}>
        <Setting
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
        />
        <Setting
          icon="setting"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <Setting
          icon="gift"
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
        />
        <Setting
          icon="info"
          heading="About"
          subheading="About Movies"
          subtitle="more"
        />
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: 36,
    marginTop: 20 * 2,
    alignItems:'center'
  },
  profileContainer: {
    alignItems: 'center',
    padding: 36,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {

    fontSize: 16,
    marginTop: 16,
    color: COLORS.White,
  },
});