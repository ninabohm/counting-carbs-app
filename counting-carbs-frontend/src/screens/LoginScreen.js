import React, { useContext, useState } from 'react';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { customStyles } from '../components/CustomStyleSheet';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('test112@test.test');
  const [password, setPassword] = useState('password');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={customStyles.screenContainer}>
      <Image
        source={require('CountingCarbs/assets/images/logo_green.png')}
        style={customStyles.logo}
      />
      <Text style={customStyles.loginText}>Welcome to CountingCarbs</Text>
      <FormInput
        value={email}
        placeholderText="Email"
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText="Password"
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
      />
      {errorMessage !== '' && (
        <Text style={customStyles.errorText}>{errorMessage}</Text>
      )}
      <FormButton buttonTitle="Login" onPress={() => handleLogin()} />
      <TouchableOpacity
        style={customStyles.loginNavButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={customStyles.loginNavButtonText}>New user? Join here</Text>
      </TouchableOpacity>
    </View>
  );
}
