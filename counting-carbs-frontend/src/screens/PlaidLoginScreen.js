import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PlaidLink } from 'react-native-plaid-link-sdk';
import { AuthContext } from '../navigation/AuthProvider';
import { fetchLinkToken, postPublicToken } from '../backend/Backend';
import { customStyles } from '../components/CustomStyleSheet';
import Header from '../components/Header';

export default function PlaidLoginScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [linkToken, setLinkToken] = useState(null);

  const getLinkToken = async () => {
    try {
      const linkToken = await fetchLinkToken();
      setLinkToken(linkToken);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLinkToken();
  }, []);

  if (!linkToken) {
    return (
      <View style={customStyles.screenContainer}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <>
      <Header navigation={navigation} />
      <View style={customStyles.screenContainer}>
        <Text style={customStyles.plaidDescription}>
          Please connect to your Plaid account
        </Text>
        <PlaidLink
          tokenConfig={{
            token: linkToken,
          }}
          onSuccess={async (success) => {
            try {
              await postPublicToken(success.publicToken);
              navigation.navigate('GoogleScreen');
            } catch (error) {
              console.log(error);
            }
          }}
          onExit={(exit) => {
            console.log(exit);
          }}
        >
          <Text style={customStyles.plaidLink}>Connect to Plaid</Text>
        </PlaidLink>
        <TouchableOpacity
          style={customStyles.plaidNavButton}
          onPress={() => logout()}
        >
          <Text style={customStyles.plaidNavButtonText}>
            Log out to restart
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
