import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import QRCodeGeneratedScreen from '../screens/QRCodeGeneratedScreen';
import CreateEventScreen from '../screens/CreateEventScreen';

const RootNavigator = createStackNavigator({
    Home: HomeScreen,
    Event: CreateEventScreen,
    QRCodeGenerated: QRCodeGeneratedScreen
});

const styles = StyleSheet.create({});

export default createAppContainer(RootNavigator);