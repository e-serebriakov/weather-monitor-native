import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Swipeout from 'react-native-swipeout';

import styles from './styles';

const CityCard = ({ onRemove, data }) => {
  const {
    id,
    name,
    country,
    temperature,
    weather,
    weatherDescription,
  } = data;

  const swipeoutBtns = [
    {
      text: 'delete',
      backgroundColor: '#fe4a49',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    }
  ];

  return (
    <Swipeout
      right={swipeoutBtns}
      style={{borderRadius: 5, backgroundColor: '#fff'}}
      autoClose
    >
      <View style={styles.card} data-id={id}>
        <Text>{name} ({country})</Text>
        <Text>{Math.round(temperature)} &#176;C</Text>
        <Text>{weather}</Text>
        <Text>({weatherDescription})</Text>
        {/*<TouchableHighlight onBtnPress={onRemove}>*/}
        {/*<Text>{null}</Text>*/}
        {/*</TouchableHighlight>*/}
      </View>
    </Swipeout>
  );
};

CityCard.propTypes = {
  onRemove: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default CityCard;
