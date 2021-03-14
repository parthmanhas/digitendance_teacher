import React, { useEffect, useState } from 'react';
// import QRCode from 'react-native-qrcode-svg';
import * as firebaseWrapper from '../components/firebaseWrapper';
import store from '../store/store';
import { View, Text, Alert, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Button } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
// import { FlatList } from 'react-native-gesture-handler';
import { ToastAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from 'rn-fetch-blob';
import * as firebase from 'firebase';
import CryptoJS from "react-native-crypto-js";
import { Card } from 'react-native-shadow-cards';

const DisplayClassEventQRCodeScreen = props => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState();
    const [qrGenerated, setQRGenerated] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [flatListData, setFlatListData] = useState([]);
    const [disableSaveAllQRCodeButton, setDisableSaveAllQRCodeButton] = useState(true);
    const [generateButton, setGenerateButton] = useState(true);
    const [activityIndicator, setActivityIndicator] = useState(true);

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
        /*
        const data - structure
        data = {regNum: {name: '', qrCode: ''}}
        */
        return new Promise((resolve, reject) => {
            const username = firebase.auth().currentUser.email.split('@')[0];
            for (var i in data) {
                var regNum = i;
                var name = data[i]['name'];
                var toEncrypt = `${username}+${name}+${regNum}+${eventDetails.eventName}+${eventDetails.eventDate}+${eventDetails.eventSecret}+${eventDetails.eventTime}+${eventDetails.expiryTime}+${eventDetails.eventType}`;
                var ciphertext = CryptoJS.AES.encrypt(toEncrypt, 'digitendance').toString();
                data[i]['qrCode'] = ciphertext;
                data[i]['attendanceMarked'] = 'false';
            }
            setData(data);
            setQRGenerated(true);
            firebaseWrapper.updateClass(className, data)
                .then(() => {
                    resolve();
                })
                .catch(err => reject(err));
            console.log(data);
        })
    }

    const handleGenerateQRCodeForEveryStudent = () => {
        // console.log(qrRefs.length);
        setGenerateButton(true);
        setActivityIndicator(true);
        generateQRForEveryStudent()
            .then(() => {
                let temp = []
                for (let i in data) {
                    temp.push({ key: i, value: data[i] });
                }
                setFlatListData(temp);
                setDisableSaveAllQRCodeButton(false);
                setActivityIndicator(false);

            })
            .catch(err => Alert.alert(err.message));

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
                                return CameraRoll.saveToCameraRoll(path, 'photo');
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
                                                    throw new Error(`An error occured while saving file at ${filePath}`);
                                                });
                                        })
                                    });
                                })
                        })
                        .then(() => Alert.alert('Files Overwritten successfully'))
                        .catch(err => Alert.alert('Overwriting Error', err.message));

                },
            }, {
                text: 'Cancel',
                onPress: () => console.log('cancel')
            }]))

    }

    useEffect(() => {
        if (className === undefined) {
            Alert.alert('className undefined in DisplayClassEventQRCodeScreen');
        }
        firebaseWrapper.getClassData(className, setData, setDataLoaded)
            .then((data) => {
                setData(data);
                setDataLoaded(true);
                setActivityIndicator(false);
                setGenerateButton(false);
            })
            .catch(err => {
                Alert.alert(err.message);
            })

        // if (data !== undefined && !qrGenerated)
        //     generateQRForEveryStudent();

    }, []);


    return (

        <View style={styles.screen}>
            {
                activityIndicator
                    ?
                    <ActivityIndicator animating={activityIndicator} style={{ marginVertical: 10 }} />
                    :
                    <Text></Text>
            }
            <Button
                full
                disabled={generateButton}
                style={generateButton ? { backgroundColor: '#bdbdbd', borderRadius: 6 } : { backgroundColor: '#009688', borderRadius: 6 }}
                onPress={handleGenerateQRCodeForEveryStudent}
            >
                <Text style={{ color: 'white' }}>Generate QR Code Image for Every Student</Text>
            </Button>
            <FlatList
                style={{ marginVertical: 10 }}
                horizontal={false}
                data={flatListData}
                renderItem={(itemData, index) => (
                    // <View style={styles.qrcode}>
                    <Card style={{ margin: 10, backgroundColor: '#4fc3f7' }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ justifyContent: 'center', padding: 10 }}>
                                <Text style={{ fontSize: 18 }}>Reg No : {itemData.item.key}</Text>
                                <Text style={{ fontSize: 18 }}>Name   : {data[itemData.item.key].name}</Text>

                            </View>
                            <View style={{ padding: 20 }}>
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
                        </View>
                    </Card>
                    // </View>
                )}
            />
            <Text style={{ textAlign: 'center' }}>Save Location : {`${RNFetchBlob.fs.dirs.PictureDir}`}</Text>
            <Text style={{ textAlign: 'center' }}>Folder Name   : {`${className}_${eventDetails.eventDate}`}</Text>
            <Button
                full
                disabled={disableSaveAllQRCodeButton}
                style={disableSaveAllQRCodeButton ? { backgroundColor: '#bdbdbd', borderRadius: 6 } : { backgroundColor: '#009688', borderRadius: 6 }}
                onPress={handleSaveAllQRCode}
            >
                <Text style={{ color: 'white' }}>Save All QR Codes Locally</Text>
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
        padding: 10,
        margin: 10,
        width: 'auto',
        paddingBottom: 20,
        backgroundColor: 'yellow'
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