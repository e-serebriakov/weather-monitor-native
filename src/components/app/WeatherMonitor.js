import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading, Font, LinearGradient } from 'expo';

import styles from './styles';
import AddForm from '../addForm/AddForm';
//import CitiesList from '../citiesList/CitiesList';
import { convertResponseToCityObject } from '../../common/utils/weatherResponseConvertor';
import {
  addCity,
  loadSavedCities,
  getWeatherByCoords,
  saveCityWeatherByCityName,
  updateSavedCityCollection,
  saveCityWeatherByCode,
} from './AppActions';

/**
 * Stateful class implementing Application
 */
export default class WeatherMonitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      inputValue: '',
      geoError: false,
      inputError: false,
    };

    this.addCity = this.addCity.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
//    this.deleteCityCard = this.deleteCityCard.bind(this);
  }
  componentWillMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'PT Sans': require('../../common/assets/fonts/ptsans.ttf'),
    });
    this.setState({ loaded: true });
  }

  handleInputChange(text) {
    this.setState({
      inputValue: text,
      inputError: false,
    });
  }

  addCity() {
    const inputValue = this.state.inputValue;
    alert(`TESTO ${inputValue}`);
  }

  render() {
    const { geoError, inputError } = this.state;
//    const { savedCities } = this.props;
    if (!this.state.loaded) {
      return <AppLoading />;
    }

    return (
      <LinearGradient
        colors={['#34e89e', '#0f3443']}
        style={{flex: 1, padding: 15, alignItems: 'center'}}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={styles.container}>
          <AddForm
            inputError={inputError}
            onBtnPress={this.addCity}
            onInputChange={this.handleInputChange}
            inputValue={this.state.inputValue}
          />
        </View>
      </LinearGradient>
    );
  }
}
