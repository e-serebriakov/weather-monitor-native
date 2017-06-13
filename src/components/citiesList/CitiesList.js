import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import CityCard from '../cityCard/CityCard';
import styles from './styles';

const CitiesList = ({ onClickDeleteBtn, cities }) => {
  return (
    <View style={styles.container}>
      {cities.map(city => <CityCard key={city.id} onRemove={onClickDeleteBtn.bind(null, city.id)} data={city} />)}
    </View>
  );
};

CitiesList.propTypes = {
  onClickDeleteBtn: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

export default CitiesList;
