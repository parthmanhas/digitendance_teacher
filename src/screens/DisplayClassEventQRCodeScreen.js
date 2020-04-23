import React, { useEffect, useState } from 'react';
// import QRCode from 'react-native-qrcode-svg';
import * as firebaseWrapper from '../components/firebaseWrapper';
import store from '../store/store';
import { View, Text, Alert, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import base64 from 'react-native-base64';
import { Button } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
// import { FlatList } from 'react-native-gesture-handler';
import { ToastAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from 'rn-fetch-blob';

const DisplayClassEventQRCodeScreen = props => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState();
    const [qrGenerated, setQRGenerated] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [flatListData, setFlatListData] = useState([]);
    const [disableSaveAllQRCodeButton, setDisableSaveAllQRCodeButton] = useState(true);

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
        setDisableSaveAllQRCodeButton(false);
    }

    const handleSaveAllQRCode = () => {

        setDisableSaveAllQRCodeButton(true);

        let result = [];
        let map = new Map();
        for (const i of qrRefs) {
            if (!map.has(i.key)) {
                map.set(i.key, true);
                result.push(i);
            }
        }
        qrRefs.filter((item, index) => qrRefs.indexOf(item) === index);
        console.log(result.length);
        let path = RNFetchBlob.fs.dirs.PictureDir + `/${className}_${eventDetails.eventDate}`;
        RNFetchBlob.fs.mkdir(path)
            .then(() => {
                result.forEach(qrRef => {
                    // console.log(qrRef.key);
                    qrRef.ref.toDataURL(ref => {
                        let filePath = path + `/${qrRef.key}_${qrRef.name}.png`;
                        RNFS.writeFile(filePath, ref, 'base64')
                            .then(success => {
                                return CameraRoll.saveToCameraRoll(path, 'photo')
                            })
                            .catch(err => {
                                throw new Error(`An error occured while saving file at ${filePath}`);
                            });
                    })
                });
            })
            .then(() => ToastAndroid.show(`Saved to path ${path}!`, ToastAndroid.SHORT))
            .catch(err => Alert.alert('Error', err.message, [{
                text: 'Overwrite',
                onPress: () => {
                    RNFetchBlob.fs.unlink(path)
                        .then(() => {
                            RNFetchBlob.fs.mkdir(path)
                                .then(() => {
                                    result.forEach(qrRef => {
                                        // console.log(qrRef.key);
                                        qrRef.ref.toDataURL(ref => {
                                            let filePath = path + `/${qrRef.key}_${qrRef.name}.png`;
                                            RNFS.writeFile(filePath, ref, 'base64')
                                                .then(success => {
                                                    return CameraRoll.saveToCameraRoll(path, 'photo')
                                                })
                                                .catch(err => {
                                                    return new Error(`An error occured while saving file at ${filePath}`);
                                                });
                                        })
                                    });
                                })
                        })
                        .then(() => Alert.alert('Files Overwritten successfully'))
                        .catch(err => ALert.alert('Overwriting Error', err.message));

                },
            }, {
                text: 'Cancel',
                onPress: () => console.log('cancel')
            }]))
            


        // let path = RNFetchBlob.fs.dirs.PictureDir + `/${className}_${eventDetails.eventDate}`;
        // RNFetchBlob.fs.mkdir(path)
        //     .then(() => console.log('first'))
        //     .then(() => console.log('second'))
        //     .catch((err) => console.log(err.message))

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
                                qrRefs.push({
                                    key: itemData.item.key,
                                    name: data[itemData.item.key].name,
                                    ref: ref
                                });

                            }}

                        />
                    </View>
                )}
            />
            <Button
                full
                disabled={disableSaveAllQRCodeButton}
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