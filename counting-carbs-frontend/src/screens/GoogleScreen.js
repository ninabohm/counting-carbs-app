import React, { useCallback, useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { customStyles } from '../components/CustomStyleSheet';
import Header from '../components/Header';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { postGoogleJourneyData } from '../backend/Backend';

const GOOGLE_TAKEOUT_URL = 'https://takeout.google.com/settings/takeout';

export default function GoogleScreen({ navigation }) {
  const [fileResponse, setFileResponse] = useState([]);

  const handleGoogleTakeoutClick = useCallback(async () => {
    await Linking.openURL(GOOGLE_TAKEOUT_URL);
  }, [GOOGLE_TAKEOUT_URL]);

  const handleUploadData = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileContent = await RNFS.readFile(result[0].uri, 'utf8');

      setFileResponse(fileContent);

      try {
        await postGoogleJourneyData(fileResponse);
        navigation.navigate('EmissionsScreen');
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={customStyles.googleContainer}>
        <View>
          <Text style={customStyles.googleText}>
            Go to “Google Takeout” and follow the steps in order to download
            your travel data
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleGoogleTakeoutClick()}>
            <View style= {[ customStyles.menuButton, customStyles.dropshadow]}>
            <View style={customStyles.googleMenuButton}>
              <Image
                source={require('CountingCarbs/assets/images/logout.png')}
                style={customStyles.menuIcon}
              />
              <Text
                style={[
                  customStyles.googleButtonText,
                  customStyles.dropshadowText,
                ]}
              >
                {' '}
                Google Takeout{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View>
          <Text style={customStyles.googleText}>
            Unzip the downloaded JSON files and use “Upload Data” in order to
            upload them
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleUploadData()}>
            <View style= {[ customStyles.menuButton, customStyles.dropshadow]}>
            <View style={customStyles.googleMenuButton}>
              <Image
                source={require('CountingCarbs/assets/images/google-upload-icon.png')}
                style={customStyles.googleUploadIcon}
              />
              <Text
                style={[
                  customStyles.googleButtonText,
                  customStyles.googleDropshadowText,
                ]}
              >
                {' '}
                Upload Data{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={customStyles.googleNavButton}
          onPress={() => navigation.navigate('EmissionsScreen')}
        >
          <Text style={customStyles.loginNavButtonText}> Skip for now </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
