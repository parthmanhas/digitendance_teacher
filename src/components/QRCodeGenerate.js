import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import  * as firebaseWrapper from '../components/firebaseWrapper';

const QRCodeGenerate = props => {

    const eventName = props.eventName;
    const eventDate = props.eventDate;
    const eventSecret = props.eventSecret;
    const eventTime = props.eventTime;
    const setQRRef = props.qrRef;
    const expiryTime = props.expiryTime;

    const currentUserEmail = firebaseWrapper.AddEvent(eventName, eventDate, eventSecret, eventTime, expiryTime);
    const qrCode = `${currentUserEmail};${eventName};${eventDate};${eventSecret};${eventTime};${expiryTime}`;// changed


    return (
        <QRCode 
        value={qrCode} 
        size={200} 
        getRef={(ref) => setQRRef(ref)} 
        quietZone={50}/>
    );
};

export default QRCodeGenerate;




    // let toEncrypt = `${data1};${data2};${data3}`;

    // let ciphertext;

    // if (data1 && data2 && data3) {
    //     ciphertext = CryptoJS.AES.encrypt(toEncrypt, 'secret key 123').toString();
    //     // console.log(ciphertext);
        

    //     let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    //     let originalText = bytes.toString(CryptoJS.enc.Utf8);
    //     // console.log(originalText);
    // }
    // else {
    //     console.error("EMTPY DATA");
    // }