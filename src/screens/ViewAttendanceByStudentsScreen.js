import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Button, } from 'native-base';
import * as firebaseWrapper from '../components/firebaseWrapper';
import { writeFile, readFile } from 'react-native-fs';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';

const ViewAttendanceByStudentsScreen = props => {

    const date = props.navigation.getParam('date', undefined);
    const username = props.navigation.getParam('username', undefined);
    const lecture = props.navigation.getParam('lecture', undefined);

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [students, setStudents] = useState([]);

    //file save operation options
    const [filename, setFilename] = useState(`Attendance_${lecture}_${date.toString()}`);
    const [displayFileSaveOptions, SetDisplayFileSaveOptions] = useState(false);

    students.sort((a, b) => {
        return Number(a.studentRegNumber) - Number(b.studentRegNumber);
    })

    const fileSaveOptionsModal = () => {
        SetDisplayFileSaveOptions(true);
    }

    const exportAttendance = () => {
        //convert to csv
        setFilename(filename + '.csv');
        let data = `Registration No,Student Name,Comment,Device Id,Manufacturer,Time,${date}\n`;

        students.forEach(student => {
            data += `${student.studentRegNumber},${student.studentName},${student.comment},${student.deviceId},${student.manufacturer},${student.time},P\n`
        });

        console.log(data);

        var RNFS = require('react-native-fs');
        var path = RNFS.ExternalStorageDirectoryPath + '/unique.txt';
        RNFS.writeFile(path, data, 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
                SetDisplayFileSaveOptions(false);
                Toast.show("File Saved Successfully!")
            })
            .catch((err) => {
                Alert.alert(err.toString());
            });
    }

    useEffect(() => {
        if (!dataLoaded) {
            firebaseWrapper.ViewAttendanceByStudent(username, setData, date, lecture, setDataLoaded);
        }
        else if (students.length == 0) {
            let getStudents = [];
            for (let i in data) {
                if (i != "init")
                    getStudents.push({
                        key: i,
                        studentRegNumber: `${data[i]['regNumber']}`,
                        studentName: `${data[i]['name']}`,
                        comment: `${data[i]['comment']}`,
                        time: `${data[i]['time']}`,
                        deviceId: `${data[i]['deviceId']}`,
                        manufacturer: `${data[i]['manufacturer']}`
                    })

            }
            if (getStudents.length == 0)
                getStudents.push({
                    key: 'qiqwndfasonf',
                    studentRegNumber: 'No',
                    studentName: 'Data'
                })
            setStudents(getStudents);

        }
    }, [dataLoaded]);

    return (
        <View style={styles.screen}>
            <Modal
                visible={displayFileSaveOptions}
                animationType='fade'
                style={styles.modal}
            >
                <View style={{ padding: 50 }}>
                    <TextInput
                        placeholder={filename}
                        onChangeText={(text) => setFilename(text)}
                        value={filename}
                        style={{ textAlign: 'center', backgroundColor: 'white' }}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            full
                            style={{marginVertical: 5, borderRadius: 3}}
                            onPress={exportAttendance}
                        >
                            <Text style={{ color: 'white' }}>Save File</Text>
                        </Button>
                        <Button
                            full
                            style={{borderRadius: 3}}
                            onPress={() => SetDisplayFileSaveOptions(false)}
                        >
                            <Text style={{ color: 'white' }}>Close</Text>
                        </Button>
                    </View>

                </View>
            </Modal>
            <Text style={styles.header}>{date}</Text>
            <View>
                <ActivityIndicator animating={!dataLoaded} />
                <FlatList
                    data={students}
                    renderItem={(itemData, index) => (
                        <View style={styles.listItem}>
                            <Text style={{ fontSize: 22 }}>{`${itemData.item.studentRegNumber} ${itemData.item.studentName}`}</Text>
                            <Text style={{ fontSize: 22 }}>Comment : {itemData.item.comment}</Text>
                            <Text style={{ fontSize: 22 }}>Time : {itemData.item.time}</Text>
                        </View>
                    )}
                />
                <Button
                    full
                    onPress={fileSaveOptionsModal}
                    style={{ padding: 10 }}
                >
                    <Text style={{ color: 'white' }}>Export Attendance</Text>
                </Button>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        margin: 10
    },
    header: {
        margin: 10,
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    listItem: {
        margin: 5,
    },
    modal: {
        flex: 1,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 20
    },
    buttonContainer: {
        alignContent: 'center',
        padding: 50
    }
});

export default ViewAttendanceByStudentsScreen;