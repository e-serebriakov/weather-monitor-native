import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

import styles from './styles';

const AddForm = ({ inputError, onBtnPress, onInputChange, inputValue }) => {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="input city name or code"
        value={inputValue}
        onChangeText={onInputChange}
        inputError={inputError}
        underlineColorAndroid="transparent"
      />
      <TouchableHighlight
        style={styles.button}
        onPress={onBtnPress}
        underlayColor="#f95d5c"
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableHighlight>
      {
        inputError &&
        <Text>
          Enter city name (example: Moscow, ru) with country code or city code (example: 2172797)
        </Text>
      }
    </View>
  );
};

AddForm.propTypes = {
  inputError: PropTypes.bool.isRequired,
  onBtnPress: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default AddForm;
