import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { customStyles } from '../components/CustomStyleSheet';
import { fetchHasToken, fetchHasTravelData } from '../backend/Backend';
import Header from '../components/Header';

export default function LoadingScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const getAccessToken = async () => {
    try {
      const accessToken = await fetchHasToken();
      const hasTravelData = await fetchHasTravelData();
      if (accessToken) {
        if (hasTravelData) {
          navigation.navigate('EmissionsScreen');
        } else {
          navigation.navigate('GoogleScreen');
        }
      } else {
        navigation.navigate('PlaidLoginScreen');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      <Header navigation={navigation} />
      <View style={customStyles.screenContainer}>
        <Text style={customStyles.loginText}>Loading</Text>
      </View>
    </>
  );
}
