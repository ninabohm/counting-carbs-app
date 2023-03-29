import React from 'react';
import { TextInput } from 'react-native';
import { customStyles } from './CustomStyleSheet';

export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={customStyles.formInput}
      numberOfLines={1}
      placeholder={placeholderText}
      {...rest}
    />
  );
}
