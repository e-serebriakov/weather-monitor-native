import React from 'react';
import { AppLoading, Font } from 'expo';
import { StyleSheet, Text, View } from 'react-native';

import App form './components/app/App';

export default class WeatherMonitor extends React.Component {
  state = {
    loaded: false,
  };

  componentWillMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'PT Sans': require('./common/assets/fonts/ptsans.ttf'),
    });
    this.setState({ loaded: true });
  }

  render() {
    if (!this.state.loaded) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text style={styles.text}>Shake your phone to open the developer menu.</Text>
        <App />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34e89e',
//    background: 'linear-gradient(-45deg, #0f3443, #34e89e)',
//    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'PT Sans'
  }
});