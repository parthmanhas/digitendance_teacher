import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGeneratedScreen = props => {
    const data1 = props.navigation.getParam('data1', 'none');
    const data2 = props.navigation.getParam('data2', 'none');
    const data3 = props.navigation.getParam('data3', 'none');

    const value = data1 + data2 + data3;
    return (
        <View style={styles.screen}>
            <Text>QR CODE GENERATED!</Text>
            <QRCode value="l"/>
            <Button title="GENERATED" />
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