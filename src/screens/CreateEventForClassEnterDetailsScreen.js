import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Modal } from 'react-native';
import { Button, Input } from 'native-base';
import *  as colors from '../constants/colors';
import store from '../store/store';
import * as firebaseWrapper from '../components/firebaseWrapper';
import DocumentPicker from 'react-native-document-picker';


const CreateEventScreen = props => {

    const [data, setData] = useState();
    const [classNames, setClassNames] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('No File Selected');
    const [fileSelected, setFileSelected] = useState(false);
    const [filePath, setFilePath] = useState('');
    const [contents, setContents] = useState('');
    const [className, setClassName] = useState('');
    const [showEnterDetailsModal, setShowEnterDetailsModal] = useState(false);


    const enterClassDetailsModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setClassName('');
    }

    const handleSelectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            // console.log(
            //   res.uri,
            //   res.type, // mime type
            //   res.name,
            //   res.size
            // );
            console.log(res.type);
            if (res.type !== 'text/comma-separated-values') {
                setUploadedFileName('No File Selected');
                setFileSelected(false);
                Alert.alert('Please Upload Only CSV file');
                return;
            }
            setUploadedFileName(res.name);
            setFileSelected(true);
            setFilePath(res.uri);
            console.log(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const handleUploadCSV = () => {
        var RNFS = require('react-native-fs');
        RNFS.readFile(filePath)
            .then(contents => {
                setContents(contents);
                var lines = contents.split('\n');
                var data = {};
                data[className] = {};
                let skip = false;
                let error = false;
                lines.every(line => {
                    if (!skip) {
                        /*
                        Format for class.csv file
                        name,regNo
                        */
                        if (line.split(',')[0] !== 'name' || line.split(',')[1] !== 'regNo') {
                            Alert.alert('Uploaded File Not in specified Format. Fomrat = name,regNo');
                            error = true;
                            return false;
                        }
                        skip = true;
                    }
                    else {
                        let [name, regNum] = line.split(',');
                        regNum = regNum.replace(' ', '').replace('/[.#$/\[]]/g', '');
                        regNum = Number(regNum);
                        name = name.replace(' ', '').replace('/[.#$/\[]]/g', '');
                        data[className][regNum] = {
                            'name': name,
                            'qrcode': ''
                        };
                    }

                });
                if (!error) {
                    firebaseWrapper.addClass(data);
                    setShowModal(false);
                    Alert.alert('Class has been created');
                    setDataLoaded(false);
                    setData();
                    setClassNames([]);
                }
            })
            .catch(err => Alert.alert(err.message));

    }

    const handleClassButton = (name) => {
        props.navigation.navigate('CreateStandAloneEvent', {
            className: name
        });
    }

    useEffect(() => {
        if (!dataLoaded) {
            setData(firebaseWrapper.getAllClass(setData, setDataLoaded));
        }

        else if (classNames.length === 0) {

            let temp = [];
            let j = 0;
            for (var i in data) {
                if (i !== 'init')
                    temp.push({ key: `${j}`, name: i });
                j++;
            }
            setClassNames(temp);
        }
    }, [dataLoaded, data])

    return (
        <View style={styles.screen}>
            <View style={styles.heading}>
                <Text style={{ fontSize: 23 }}>Select a Class</Text>
            </View>

            {/* <Button title="Set class details" onPress={setClass} />
            <Button title="console log" onPress={print} /> */}

            <ActivityIndicator animating={!dataLoaded} />
            <FlatList
                data={classNames}
                renderItem={(itemData, index) => (
                    <View style={styles.listItem}>
                        <Button
                            full
                            rounded
                            onPress={() => {
                                handleClassButton(itemData.item.name)
                            }}
                        >
                            <Text style={{ color: 'white', padding: 30, fontSize: 18 }}>{itemData.item.name}</Text>
                        </Button>
                    </View>
                )}
            />

            <Button
                full
                rounded
                onPress={enterClassDetailsModal}
            >
                <Text style={{ color: 'white', padding: 10, fontSize: 18 }}>Add New Class</Text>
            </Button>
            <Modal visible={showModal} animationType="fade" style={styles.modal}>
                <View style={styles.displayFileContainer}>
                    <Text style={styles.text}>{uploadedFileName}</Text>

                    <Input
                        placeholder="Enter Class Name"
                        onChangeText={(text) => setClassName(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        full
                        onPress={handleSelectFile}
                        style={styles.button}
                    >
                        <Text style={{ padding: 19, color: 'white' }}>Select File</Text>
                    </Button>
                    {/* </View> */}
                    {/* <View style={styles.bottom}> */}
                    <Button
                        full
                        onPress={handleUploadCSV}
                        style={styles.button}
                        disabled={!(fileSelected && className !== '')}
                    >
                        <Text style={{ padding: 19, color: 'white' }}>Upload</Text>
                    </Button>
                    <Button
                        full
                        onPress={closeModal}
                        style={styles.button}
                    >
                        <Text style={{ padding: 19, color: 'white' }}>Close</Text>
                    </Button>
                    {/* </View> */}
                </View>

            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND
    },
    heading: {
        alignContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        flex: 1,
        margin: 5
    },
    modal: {
        flex: 1,
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 36,
    },
    center: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 36
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    button: {
        margin: 5
    },
    displayFileContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        paddingTop: '50%'
    },
    input: {

        backgroundColor: 'yellow'
    },
    enterClassDetailsModal: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10
    }
})

export default CreateEventScreen;

