import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import CryptoJS from "react-native-crypto-js";

const QRCodeGeneratedScreen = props => {
    const data1 = props.navigation.getParam('data1', undefined);
    const data2 = props.navigation.getParam('data2', undefined);
    const data3 = props.navigation.getParam('data3', undefined);

    const Encryption = () => {

        if (data1 && data2 & data3) {
            let toEncrypt = `${data1};${data2};${data3}`;
            let ciphertext = CryptoJS.AES.encrypt(toEncrypt, 'secret key 123').toString();
            console.log(ciphertext);

            let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            console.log(originalText);
        }
        else{
            console.error("EMTPY DATA");
        }

    }


    const value = data1 + data2 + data3;
    return (
        <View style={styles.screen}>
            <Text>QR CODE GENERATED!</Text>
            <QRCode value="l" />
            <Button title="GENERATED" onPress={Encryption} />

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