import React from 'react';
import { Provider } from 'react-redux';

import WeatherMonitor from './src/WeatherMonitor';
import reducer from './src/reducer';
import configureStore from './src/store/configureStore';

const store = configureStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <WeatherMonitor />
      </Provider>
    );
  }
}
