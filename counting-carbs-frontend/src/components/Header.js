import { customStyles } from './CustomStyleSheet';
import { Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

export default function Header({ navigation }) {
  const route = useRoute();

  function menuPress(e) {
    let screenState;
    if (route.name === 'EmissionsScreen') {
      navigation.navigate('MenuScreen');
    } else {
      navigation.navigate('EmissionsScreen');
    }
  }
  return (
    <SafeAreaView style={customStyles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('EmissionsScreen')}>
        <Image
          source={require('CountingCarbs/assets/images/logo_white.png')}
          style={customStyles.headerLogo}
        />
      </TouchableOpacity>
      <Image
        source={require('CountingCarbs/assets/images/co2_white.png')}
        style={customStyles.headerCO2}
      />
      <TouchableOpacity
        onPress={() => {
          menuPress();
        }}
      >
        <Image
          source={require('CountingCarbs/assets/images/menu.png')}
          style={customStyles.headerMenu}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
