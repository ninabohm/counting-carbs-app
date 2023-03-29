import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { customStyles } from './CustomStyleSheet';

export default function FormButton({ buttonTitle, ...rest }) {
  return (
    <TouchableOpacity style={customStyles.buttonContainer} {...rest}>
      <Text style={customStyles.loginButtonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}
