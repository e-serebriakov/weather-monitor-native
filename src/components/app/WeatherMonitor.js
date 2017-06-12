import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading, Font, LinearGradient } from 'expo';

import styles from './styles';
import AddForm from '../addForm/AddForm';
import CitiesList from '../citiesList/CitiesList';
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
 * Stateful class implementing WeatherMonitor
 */
class WeatherMonitor extends Component {
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
    this.deleteCityCard = this.deleteCityCard.bind(this);
  }

  /**
   * Return storage key
   * @return {string}
   */
  static get storageKey() {
    return 'savedCities';
  }

  async componentDidMount() {
    await this.loadAssetsAsync();
    const savedCityCollection = await WeatherMonitor.getSavedCityCollection();

    if (savedCityCollection && savedCityCollection.length) {
      const citiesIds = WeatherMonitor.getSavedCitiesIds(savedCityCollection);
      this.props.updateSavedCityCollection(citiesIds);
    }

    if (!navigator.geolocation) {
      this.setState({ geoError: true });
      return;
    }

    this.setState({ loaded: true });

    this.isCurrentCityInStorage(savedCityCollection)
      .then(result => {
        if (result && !result.isCityInStorage) {
          this.props.getWeatherByCoords({
            lat: result.currentPosition.coords.latitude.toFixed(1),
            lon: result.currentPosition.coords.longitude.toFixed(1),
          })
            .then(response => {
              WeatherMonitor.getSavedCityCollection().then(savedCityCollection => {
                const currentCity = convertResponseToCityObject(response);
                this.props.addCity(currentCity);
                WeatherMonitor.addCityToStorage(currentCity, savedCityCollection);
              });

            });
          this.setState({ geoError: false });
        }
      });
  }

  /**
   * Get saved cities IDs
   * @param cities
   * @private
   */
  static getSavedCitiesIds(cities) {
    return cities.map(city => city.id);
  }

  /**
   * Check if the current city is in storage
   */
  isCurrentCityInStorage(cityCollection) {
    return this.getCurrentPosition()
      .then(currentPosition => {
        const currentCityPosition = {
          lat: parseFloat(currentPosition.coords.latitude.toFixed(1)),
          lon: parseFloat(currentPosition.coords.longitude.toFixed(1)),
        };

        if (!cityCollection || !cityCollection.length) {
          return {
            isCityInStorage: false,
            currentPosition,
          }
        }

        const isCityInStorage = cityCollection.some(city => {
          return city.coords.lat === currentCityPosition.lat &&
            city.coords.lon === currentCityPosition.lon;
        });

        return {
          isCityInStorage,
          currentPosition,
        }
      })
      .catch(error => {
        this.setState({ geoError: true });
        console.log('Geo error', error);
      });
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'PT Sans': require('../../common/assets/fonts/ptsans.ttf'),
    });
    return Promise.resolve();
  };

  /**
   * Get user navigator coordinates
   */
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          // alert(`Position: ${position.coords.latitude} ${position.coords.longitude}`);
          resolve(position);
        },
        error => reject(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    });
  }

  handleInputChange(text) {
    this.setState({
      inputValue: text,
      inputError: false,
    });
  }

  /**
   * Add new city
   */
  async addCity() {
    const savedCityCollection = await WeatherMonitor.getSavedCityCollection();
    alert(`addCity ${savedCityCollection}`);
    const inputValue = this.state.inputValue;
    if (!this.state.inputValue.trim()) {
      this.setState({ inputError: true });
      return;
    }

    if (!(isNaN(parseInt(inputValue, 10)))) {
      this.props.saveCityWeatherByCode(inputValue).then((response) => {
        const addedCity = convertResponseToCityObject(response);
        this.props.loadSavedCities(this.props.savedCities.concat(addedCity));
        WeatherMonitor.addCityToStorage(addedCity, savedCityCollection);
      });
      this.setState({ inputValue: '' });
      return;
    }

    const cityDataArray = inputValue.split(',');
    if (cityDataArray.length !== 2) {
      this.setState({ inputError: true });
      return;
    }
    const cityName = cityDataArray[0].trim();
    const countryCode = cityDataArray[1].trim();
    this.props.saveCityWeatherByCityName({ cityName, countryCode })
      .then((response) => {
        const addedCity = convertResponseToCityObject(response);
        this.props.loadSavedCities(this.props.savedCities.concat(addedCity));
        WeatherMonitor.addCityToStorage(addedCity, savedCityCollection);
      });
    this.setState({ inputValue: '' });
  }

  /**
   * Add city to localStorage
   * @param newCity
   * @param savedCities
   */
  static addCityToStorage(newCity, savedCities) {
    savedCities = savedCities || [];
    const updatedCollection = savedCities.concat(newCity);
    AsyncStorage.setItem(WeatherMonitor.storageKey, JSON.stringify(updatedCollection));
  }

  /**
   * Get saved cities from storage
   */
  static getSavedCityCollection() {
    return AsyncStorage.getItem(WeatherMonitor.storageKey).then((collection) => {
      return JSON.parse(collection);
    });
  }

  /**
   * Delete city
   * @param event
   */
  deleteCityCard(event) {
    const cityElement = event.target.closest('div');
    const cityID = cityElement.getAttribute('data-id');
    const savedCityCollection = WeatherMonitor.getSavedCityCollection();
    const filteredCityCollection = savedCityCollection.filter(city => {
      return parseInt(city.id, 10) !== parseInt(cityID, 10);
    });

    AsyncStorage.setItem(WeatherMonitor.storageKey, JSON.stringify(filteredCityCollection));

    this.props.loadSavedCities(filteredCityCollection);
  }

  render() {
    const { geoError, inputError } = this.state;
    const { savedCities } = this.props;

    if (!this.state.loaded) {
      return <AppLoading><Text>Wait...</Text></AppLoading>;
    }

    return (
      <LinearGradient
        colors={['#34e89e', '#0f3443']}
        style={styles.gradientContainer}
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
          {geoError && <Text style={styles.error}>Location error (try enable geo or try later)</Text>}
          {
            savedCities && savedCities.length ?
              <CitiesList cities={savedCities} onClickDeleteBtn={this.deleteCityCard} /> :
              null
          }
        </View>
      </LinearGradient>
    );
  }
}


WeatherMonitor.propTypes = {
  addedCity: PropTypes.object,
  savedCities: PropTypes.array,
  currentCity: PropTypes.object,
  addCity: PropTypes.func.isRequired,
  loadSavedCities: PropTypes.func.isRequired,
  getWeatherByCoords: PropTypes.func.isRequired,
  saveCityWeatherByCityName: PropTypes.func.isRequired,
  saveCityWeatherByCode: PropTypes.func.isRequired,
  updateSavedCityCollection: PropTypes.func.isRequired,
};

WeatherMonitor.defaultProps = {
  addedCity: null,
  currentCity: null,
  savedCities: [],
};

export default connect(
  state => ({
    addedCity: state.addedCity,
    savedCities: state.savedCities,
    currentCity: state.currentCity,
  }),
  dispatch => ({
    addCity(cityWeatherData) {
      dispatch(addCity(cityWeatherData));
    },
    getWeatherByCoords(coords) {
      return dispatch(getWeatherByCoords(coords));
    },
    saveCityWeatherByCityName(data) {
      return dispatch(saveCityWeatherByCityName(data));
    },
    saveCityWeatherByCode(cityID) {
      return dispatch(saveCityWeatherByCode(cityID));
    },
    updateSavedCityCollection(IDs) {
      dispatch(updateSavedCityCollection(IDs))
    },
    loadSavedCities(savedCityCollection) {
      dispatch(loadSavedCities(savedCityCollection));
    },
  }),
)(WeatherMonitor);
