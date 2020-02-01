import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCodeGenerate from '../components/QRCodeGenerate';
import * as firebase from 'firebase';

const QRCodeGeneratedScreen = props => {
    const data1 = props.navigation.getParam('data1', undefined);
    const data2 = props.navigation.getParam('data2', undefined);
    const data3 = props.navigation.getParam('data3', undefined);


    const value = data1 + data2 + data3;
    // console.log(value);
    return (
        <View style={styles.screen}>
            <Text>QR CODE GENERATED!</Text>
            <QRCodeGenerate data1={data1} data2={data2} data3={data3} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default QRCodeGeneratedScreen;