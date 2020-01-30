import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import CryptoJS from "react-native-crypto-js";
import * as firebase from 'firebase';

const QRCodeGenerate = props => {

    const data1 = props.data1;
    const data2 = props.data2;
    const data3 = props.data3;

    let toEncrypt = `${data1};${data2};${data3}`;

    let ciphertext;

    if (data1 && data2 && data3) {
        ciphertext = CryptoJS.AES.encrypt(toEncrypt, 'secret key 123').toString();
        // console.log(ciphertext);
        

        let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(originalText);
    }
    else {
        console.error("EMTPY DATA");
    }
    
    firebase.database().ref('secret/002').set({
        secretKey: ciphertext
    });

    return (
        <QRCode value={ciphertext} />
    );
};

export default QRCodeGenerate;