import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { customStyles } from './CustomStyleSheet';

export default function Footer() {
  const handleOnPress = () => {
    console.log('pressing');
    Alert.alert('CountingCarbs');
  };
  return (
    <View style={customStyles.footer}>
      <TouchableOpacity onPress={handleOnPress}>
        <Image
          source={require('CountingCarbs/assets/images/logo_white.png')}
          style={customStyles.footerLogo}
        />
      </TouchableOpacity>
      <Text
        style={[customStyles.footerText, customStyles.dropshadowText]}
        onPress={handleOnPress}
      >
        CountingCarbs
      </Text>
    </View>
  );
}
