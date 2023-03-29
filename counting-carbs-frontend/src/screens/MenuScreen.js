import { Image, Text, TouchableOpacity, View } from 'react-native';
import { customStyles } from '../components/CustomStyleSheet';
import { AuthContext } from '../navigation/AuthProvider';
import { useContext } from 'react';
import Header from '../components/Header';

export default function MenuScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  return (
    <>
    <Header navigation={navigation} />
        <View style = {customStyles.menu}>
            <TouchableOpacity onPress={() => logout()}>
                <View style= {[ customStyles.menuButton, customStyles.dropshadow]}>
                    <Image
                        source={require('CountingCarbs/assets/images/logout.png')}
                        style={customStyles.menuIcon}
                    />
                    <Text style = {[customStyles.menuText, customStyles.dropshadowText]}> Logout </Text>
                    <View style={customStyles.separationItem}>
                              <Text style={customStyles.separationItem}></Text>
                    </View>
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GoogleScreen')}>
            <View style= {[ customStyles.menuButton, customStyles.dropshadow]}>
              <Image
                source={require('CountingCarbs/assets/images/google-upload-icon.png')}
                style={customStyles.googleUploadIcon}
              />
              <Text
                style={[customStyles.menuText, customStyles.dropshadowText]}
              >
                {' '}
                Travel Data{' '}
              </Text>
                <View style={customStyles.separationItem}>
                  <Text style={customStyles.separationItem}></Text>
                </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
