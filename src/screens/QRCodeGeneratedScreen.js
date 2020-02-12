import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCodeGenerate from '../components/QRCodeGenerate';

const QRCodeGeneratedScreen = props => {
    const eventName = props.navigation.getParam('eventName', undefined);
    const eventDate = props.navigation.getParam('eventDate', undefined);
    const eventSecret = props.navigation.getParam('eventSecret', undefined);
    const eventTime = props.navigation.getParam('eventTime', undefined);
    
    return (
        <View style={styles.screen}>
            <Text>QR CODE GENERATED!</Text>
            <QRCodeGenerate eventName={eventName} eventDate={eventDate} eventSecret={eventSecret} eventTime={eventTime} />
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