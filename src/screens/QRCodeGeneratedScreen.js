import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCodeGenerate from '../components/QRCodeGenerate';
import Share from 'react-native-share';

const QRCodeGeneratedScreen = props => {
    const eventName = props.navigation.getParam('eventName', undefined);
    const eventDate = props.navigation.getParam('eventDate', undefined);
    const eventSecret = props.navigation.getParam('eventSecret', undefined);
    const eventTime = props.navigation.getParam('eventTime', undefined);

    //store reference of qr code generated in this variable
    //which is passed as prop to QRCodeGenerate component
    const [qrRef, setQRRef] = useState('');

    const shareQr = () => {
        qrRef.toDataURL(data => {
            //encrypt data
            const shareImageBase64 = {
                title: 'QR Code',
                message: eventName + ' QR Code',
                url: `data:image/png;base64,${data}`
            };

            Share.open(shareImageBase64)
                .then(() => { })
                .catch(() => { });
        })
    }

    const onProfilePress = () => {
        props.navigation.navigate('Teacher');
    }

    const onCreateAnotherEventPress = () => {
        props.navigation.navigate('Teacher');
    }


    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 22, margin: 10 }}>QR CODE GENERATED!</Text>
            <View style={styles.qr}>
                <QRCodeGenerate
                    eventName={eventName}
                    eventDate={eventDate}
                    eventSecret={eventSecret}
                    eventTime={eventTime}
                    qrRef={setQRRef} />
                <View style={{ ...styles.button }}>
                    <Button title="Share" onPress={shareQr} />
                </View>
                <View style={styles.button}>
                    <Button title="Go to profile" onPress={onProfilePress} />
                </View>
                <View style={styles.button}>
                    <Button title="Create another Event" onPress={onCreateAnotherEventPress} />
                </View>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qr: {
        padding: 5,
    },
    button: {
        marginVertical: 5
    }
});

export default QRCodeGeneratedScreen;