import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCodeGenerate from '../components/QRCodeGenerate';
import Share from 'react-native-share';
import store from '../store/store';
import * as firebase from 'firebase';
import QRCode from 'react-native-qrcode-svg';
import * as firebaseWrapper from '../components/firebaseWrapper';
import { Button } from 'native-base';
import CryptoJS from 'react-native-crypto-js';

const DisplayStandAloneEventQRCodeScreen = props => {
    // const eventName = props.navigation.getParam('eventName', undefined);
    // const eventDate = props.navigation.getParam('eventDate', undefined);
    // const eventSecret = props.navigation.getParam('eventSecret', undefined);
    // const eventTime = props.navigation.getParam('eventTime', undefined);
    // const expiryTime = props.navigation.getParam('expiryTime', undefined);

    // console.log(event);
    //store reference of qr code generated in this variable
    //which is passed as prop to QRCodeGenerate component
    const [qrRef, setQRRef] = useState('');

    const e = store.getState().eventDetails;
    const eventName = e.eventName;
    const eventDate = e.eventDate;
    const eventSecret = e.eventSecret;
    const eventTime = e.eventTime;
    const expiryTime = e.expiryTime;
    const eventType = e.eventType

    const currentUserEmail = firebase.auth().currentUser.email.split('@')[0];

    
    const toEncrypt = `${currentUserEmail};${eventName};${eventDate};${eventSecret};${eventTime};${expiryTime};${eventType}`;
    var qrCode = CryptoJS.AES.encrypt(toEncrypt, 'digitendance').toString();

    firebaseWrapper.AddEvent(qrCode);

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
                <QRCode
                    value={qrCode}
                    size={250}
                    getRef={(ref) => setQRRef(ref)}
                    quietZone={20} />
            </View>
            {/* <View style={styles.buttonContainer}> */}
            <Button
                full
                onPress={shareQr}
                style={{ ...styles.button, marginTop: 30, marginVertical: 5, backgroundColor: '#009688', borderRadius: 6 }}
            >
                <Text style={{ color: 'white' }}>Share</Text>
            </Button>
            <Button
                full
                onPress={onProfilePress}
                style={{ ...styles.button, marginVertical: 5, backgroundColor: '#26a69a', borderRadius: 6 }}
            >
                <Text style={{ color: 'white' }}>Go to profile</Text>
            </Button>
            <Button
                full
                onPress={onCreateAnotherEventPress}
                style={{ ...styles.button, marginVertical: 5, backgroundColor: '#4db6ac', borderRadius: 6 }}
            >
                <Text style={{ color: 'white' }}>Create another Event</Text>
            </Button>

            {/* <View style={{ ...styles.button, backgroundColor: '#ef5350' }}>
                    <Button title="Share" onPress={shareQr} />
                </View>
                <View style={styles.button}>
                    <Button title="Go to profile" onPress={onProfilePress} />
                </View>
                <View style={styles.button}>
                    <Button title="Create another Event" onPress={onCreateAnotherEventPress} />
                </View> */}



        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    qr: {
        backgroundColor: 'yellow'
    },
    button: {
        marginHorizontal: 40
    },
    buttonContainer: {
        backgroundColor: 'yellow'
    }
});

export default DisplayStandAloneEventQRCodeScreen;