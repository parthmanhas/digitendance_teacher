import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const QRCodeGeneratedScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>QR CODE GENERATED!</Text>
            <Button title="GENERATED"/>
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