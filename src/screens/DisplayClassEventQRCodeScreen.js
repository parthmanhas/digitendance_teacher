import React, { useEffect, useState } from 'react';
// import QRCode from 'react-native-qrcode-svg';
import * as firebaseWrapper from '../components/firebaseWrapper';
import store from '../store/store';
import { View, Text, Alert, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import base64 from 'react-native-base64';
import { Button } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { FlatList } from 'react-native-gesture-handler';

const DisplayClassEventQRCodeScreen = props => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState();
    const [qrGenerated, setQRGenerated] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [flatListData, setFlatListData] = useState([]);

    const [controlUseEffect, setControlUseEffect] = useState(false);

    const eventDetails = store.getState().eventDetails;

    let qrRefs = [];
    /*
    eventDetails structure

    eventDetails:{
        eventName: '',
        eventDate: '',
        eventSecret: '',
        eventTime: '',
        expiryTime: '',
        eventType: ''
    }
    */
    const className = props.navigation.getParam('className', undefined);
    // const currentUserEmail = firebaseWrapper.AddEvent(eventName, eventDate, eventSecret, eventTime, expiryTime, eventType);
    // const qrCode = `${currentUserEmail};${eventName};${eventDate};${eventSecret};${eventTime};${expiryTime}`;// changed


    const generateQRForEveryStudent = () => {
        console.log('astaretasdasd;');
        /*
        const data - structure
        data = {regNum: {name: '', qrCode: ''}}
        */
        for (var i in data) {
            var regNum = i;
            var name = data[i]['name'];
            var toEncode = `${name}+${regNum}+${eventDetails.eventName}+${eventDetails.eventDate}+${eventDetails.eventSecret}+${eventDetails.eventTime}+${eventDetails.expiryTime}+${eventDetails.eventType}`;
            data[i]['qrCode'] = base64.encode(toEncode);
            data[i]['attendanceMarked'] = 'false';
        }
        setData(data);
        setQRGenerated(true);
        firebaseWrapper.updateClass(className, data);
        console.log(data);
    }

    const handleGenerateQRCodeForEveryStudent = () => {
        console.log(qrRefs.length);
        setGenerating(true);
        let temp = []
        for (let i in data) {
            temp.push({ key: i, value: data[i] });
        }
        setFlatListData(temp);
        // setGenerating(false);
    }

    const handleSaveAllQRCode = () => {
        // for (let i in data) {
        //     console.log(i, data[i].name);
        //     setQR(<QRCode
        //         value={data[i]['qrcode']}
        //         quietZone={10}
        //         getRef={(ref) => setQRRef(ref)}
        //     />)
        // }
        // setControlUseEffect(!controlUseEffect);
        // console.log(qrRefs.length);
        let unique = [...new Set(qrRefs)];
        console.log(unique.length);
    }

    useEffect(() => {
        if (className === undefined) {
            Alert.alert('className undefined in DisplayClassEventQRCodeScreen');
        }
        if (!dataLoaded) {
            firebaseWrapper.getClassData(className, setData, setDataLoaded);
        }

        if (data !== undefined && !qrGenerated)
            generateQRForEveryStudent();

    }, [dataLoaded, data]);

    // useEffect(() => {
    //     console.log('called');
    //     for (let i in data) {
    //         console.log(i, data[i].name);
    //         setQR(<QRCode
    //             value={data[i]['qrcode']}
    //             quietZone={10}
    //             getRef={(ref) => setQRRef(ref)}
    //         />)
    //     }
    // }, [qrRef, controlUseEffect])

    // useEffect(() => {

    // },[controlUseEffect]);


    return (

        <View style={styles.screen}>
            <Text>Class Created and Updated in Database!</Text>
            <ActivityIndicator animating={generating} />
            <Button
                full
                disabled={generating}
                onPress={handleGenerateQRCodeForEveryStudent}
            >
                <Text style={{ color: 'white' }}>Generate QR Code Image for Every Student</Text>
            </Button>
            <FlatList
                horizontal={false}
                data={flatListData}
                renderItem={(itemData, index) => (
                    <View style={styles.qrcode}>
                        <Text>{itemData.item.key}</Text>
                        <Text>{data[itemData.item.key].name}</Text>
                        <QRCode
                            value={data[itemData.item.key]['qrCode']}
                            quietZone={10}
                            getRef={ref => {
                                if (!(ref in qrRefs)) {
                                    qrRefs.push(ref);
                                }
                            }}

                        />
                    </View>
                )}
            />
            <Button
                full
                onPress={handleSaveAllQRCode}
            >
                <Text style={{ color: 'white' }}>Save All Code</Text>
            </Button>
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
    qrcode: {
        padding: 10
    }
});

export default DisplayClassEventQRCodeScreen;




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