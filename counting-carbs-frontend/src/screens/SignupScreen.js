import React, { useContext, useState } from 'react';
import { Image, Text, View } from 'react-native';
import FormButton from 'CountingCarbs/src/components/FormButton.js';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import { customStyles } from '../components/CustomStyleSheet';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('test112@test.test');
  const [password, setPassword] = useState('password');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const { register } = useContext(AuthContext);
  return (
    <View style={customStyles.signupContainer}>
      <Image
        source={require('CountingCarbs/assets/images/logo_green.png')}
        style={customStyles.logo}
      />
      <Text style={customStyles.signupText}>Create an account</Text>
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
      <FormButton buttonTitle="Signup" onPress={() => handleRegister()} />
    </View>
  );
}
