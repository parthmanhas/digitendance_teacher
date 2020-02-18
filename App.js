/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import DigitendanceNavigator from './src/navigation/DigitendanceNavigator';
import { Provider } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import { setLocation } from './src/store/actions/location';
import { PermissionsAndroid } from 'react-native';
import { Text, Alert } from 'react-native';
import store from './src/store/store';

const App: () => React$Node = () => {

  const [access, setAccess] = useState(false);
  const [position, setPosition] = useState();

  async function hasLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      setAccess(granted === PermissionsAndroid.RESULTS.GRANTED)
    } catch (err) {
      Alert.alert(err.toString());
    }
  }

  async function findMyLocation() {
    if (PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          setPosition(position);
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }

  useEffect(() => {
    hasLocation();
    if (!position) {
      findMyLocation();
    }
    else {
      store.dispatch(setLocation(position));
    }
  }, [position]);




  return (
    <Provider store={store}>
      {access ? <DigitendanceNavigator /> : <Text>Please Enable Location and Restart the app</Text>}
    </Provider>
  );
};

export default App;
