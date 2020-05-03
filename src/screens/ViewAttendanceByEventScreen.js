console.ignoredYellowBox = ['Setting a timer'];

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert, Modal } from 'react-native';
import { Button } from 'native-base';
import * as firebaseWrapper from '../components/firebaseWrapper';
import * as firebase from 'firebase';
import store from '../store/store';
import RNFS from 'react-native-fs';
import Toast from 'react-native-simple-toast';
import { Card } from 'react-native-shadow-cards';

const ViewAttendanceByEventScreen = props => {

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dates, setDates] = useState([]);
    const [displayLectureModal, setDisplayLectureModal] = useState(false);
    const [displayQuizModal, setDisplayQuizModal] = useState(false);
    const [displayTestModal, setDisplayTestModal] = useState(false);
    const [displayWorkshopModal, setDisplayWorkshopModal] = useState(false);

    //modal variables
    const [modalDates, setModalDates] = useState();
    const [datesLoaded, setDatesLoaded] = useState(false);
    const isFirstRun = useRef(true);
    const [selectedEventType, setSelectedEventType] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [event, setEvent] = useState();
    const [eventsLoaded, setEventsLoaded] = useState(false);
    /**
     * local attendance object structure
     * {
     *      studentRegNumber:
     *      studentName:
     *      deviceID:
     *      time:
     * }
     */
    const [attendance, setAttendance] = useState();
    const [selectedEventName, setSelectedEventName] = useState();
    const [displayAttendanceModal, setDisplayAttendanceModal] = useState(false);
    const [attendanceLoaded, setAttendanceLoaded] = useState(false);
    const [displayNotFound, setDisplayNotFound] = useState(<Text></Text>);

    const [debug, setDebug] = useState('');

    const username = props.navigation.getParam('username', undefined);

    const eventDetails = store.getState().eventDetails;


    const handleDateButtonPress = (eventName) => {
        switch (eventName) {
            case 'lecture':
                setDisplayLectureModal(true);
                break;
            case 'quiz':
                setDisplayQuizModal(true);
                break;
            case 'test':
                setDisplayTestModal(true);
                break;
            case 'workshop':
                setDisplayWorkshopModal(true);
                break;
            default:
                throw new Error('Error at ViewAttendanceByDateScreen->handleDateButtonPress->switch');
        }
        props.navigation.navigate('ViewAttendanceByLectureScreen', { eventName: eventName });

    }

    useEffect(() => {

        if (!dataLoaded) {
            let data;
            firebaseWrapper.ViewAttendanceByDate(username, data, setDataLoaded)
                .then((data) => {
                    let tmp = [];
                    let j = 0;
                    Object.entries(data).forEach(([k, v]) => {
                        if (!['allClasses', 'allDates', 'allEventTaken'].includes(k))
                            tmp.push({ key: `${j}`, eventName: k });
                        j++;
                    })
                    tmp.sort();
                    setDates(tmp);
                })
                .catch(err => Alert.alert('Error', err.message));
        }

    }, [dataLoaded]);

    const getModalDates = (value) => {
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = `${username}/${value}`
        let data = [];
        setModalDates();
        setDatesLoaded(false);
        firebase.database().ref(path).once('value')
            .then((snap) => {
                let j = 0;
                Object.entries(snap.val()).forEach(([k, v]) => {
                    data.push({ key: `${j}`, value: k });
                    j++;
                })
                data.sort((a, b) => {
                    return new Date(b.value) - new Date(a.value);
                })
                setModalDates(data);
                setDatesLoaded(true);
            })
            .catch((err) => Alert.alert('Error', err.message));
    }

    const getEvents = () => {
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = `${username}/${selectedEventType}/${selectedDate}`
        let data = [];
        setEvent();
        setEventsLoaded(false);
        firebase.database().ref(path).once('value')
            .then((snap) => {
                let j = 0;
                Object.entries(snap.val()).forEach(([k, v]) => {
                    data.push({ key: `${j}`, value: k })
                    j++;
                })
                setEvent(data);
                setEventsLoaded(true);
            })
            .catch(err => Alert.alert('Error', err.message));
    }

    const getAttendance = (selectedEventName) => {
        setSelectedEventName(selectedEventName);
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = `${username}/${selectedEventType}/${selectedDate}/${selectedEventName}/attendance`;
        console.log(path);
        setAttendance();
        setAttendanceLoaded();
        let data = [];
        firebase.database().ref(path).once('value')
            .then((snap) => {
                if (Object.keys(snap.val())[0].length === 9) {
                    //render class event
                    const obj = snap.val();
                    let j = 0;
                    Object.keys(obj).forEach(key => {
                        const regNumber = key;
                        if (key !== 'init')
                            data.push({
                                key: `${j}`,
                                studentRegNumber: regNumber,
                                studentName: obj[regNumber]['name'],
                                comment: obj[regNumber]['comment'] ? obj[regNumber]['comment'] : '',
                                time: obj[regNumber]['time'] ? obj[regNumber]['time'] : '',
                                deviceId: obj[regNumber]['deviceId'] ? obj[regNumber]['deviceId'] : '',
                                manufacturer: obj[regNumber]['manufacturer'] ? obj[regNumber]['manufacturer'] : '',
                                attendanceMarked: obj[regNumber]['attendanceMarked'] === 'true' || obj[regNumber]['attendanceMarked'] === true ? true : false
                            })
                        j++;
                    })
                    setAttendance(data);
                    setAttendanceLoaded(true);
                }
                else {
                    //render stand alone event
                    let j = 0;
                    Object.entries(snap.val()).forEach(([idFirebase, obj]) => {
                        // console.log(idFirebase, obj)
                        const regNumber = Object.keys(obj)[0];
                        setDebug(idFirebase);
                        if (idFirebase !== 'init')
                            data.push({
                                key: `${j}`,
                                studentRegNumber: regNumber,
                                studentName: obj[regNumber]['name'],
                                comment: obj[regNumber]['comment'] ? obj[regNumber]['comment'] : '',
                                time: obj[regNumber]['time'] ? obj[regNumber]['time'] : '',
                                deviceId: obj[regNumber]['deviceId'] ? obj[regNumber]['deviceId'] : '',
                                manufacturer: obj[regNumber]['manufacturer'] ? obj[regNumber]['manufacturer'] : '',
                                attendanceMarked: obj[regNumber]['attendanceMarked'] === 'true' || obj[regNumber]['attendanceMarked'] === true ? true : false
                            })
                        j++;
                    })
                    setAttendance(data);
                    // console.log(data);
                    setAttendanceLoaded(true);
                }

                // console.log(snap.val());

            })
            .catch(err => Alert.alert('Error', err.message));

    }

    const exportAttendance = () => {
        let filename = `${selectedEventName}_${selectedDate.replace(/([\s])+/g, '_')}`;
        console.log(filename);
        let csvHeading = `Registration No,Student Name,Comment,Device Id,Manufacturer,Time,${selectedDate}\n`;
        let toSave = csvHeading;
        attendance.forEach(student => {
            console.log(student);
            toSave += `${student.studentRegNumber},${student.studentName},${student.comment},${student.deviceId},${student.manufacturer},${student.time},P\n`;
        });

        console.log(typeof (toSave));


        var path = RNFS.DownloadDirectoryPath + `/${filename}.csv`;
        console.log(path);

        RNFS.writeFile(path, toSave, 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
                Toast.show("File Saved Successfully!")
            })
            .catch((err) => {
                Alert.alert('Error', err.message);
                Toast.show('An error occured! Please Try Again')
            });
    }

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (displayLectureModal)
            getModalDates('lecture');
        else if (displayQuizModal)
            getModalDates('quiz');
        else if (displayWorkshopModal)
            getModalDates('workshop');
        else if (displayTestModal)
            getModalDates('test');

        if (selectedEventType !== undefined)
            getEvents();

    }, [displayLectureModal, displayQuizModal, displayTestModal, displayWorkshopModal, selectedEventType]);

    useEffect(() => {
        if (attendance === undefined && attendanceLoaded)
            setDisplayNotFound(<Text>No data found</Text>)
    }, [attendance, attendanceLoaded])


    return (
        <View style={styles.screen}>
            <Text style={{ margin: 15, fontSize: 22, fontWeight: 'bold', marginBottom: 30 }}>Select A Event</Text>
            <ActivityIndicator animating={!dataLoaded} />
            <FlatList
                data={dates}
                renderItem={(itemData, index) => (
                    <View style={styles.listItem}>
                        <Button
                            full
                            success
                            style={{ backgroundColor: '#009688', borderRadius: 6 }}
                            onPress={() => handleDateButtonPress(itemData.item.eventName)}
                        >
                            <Text style={{ color: 'white', padding: 10, fontSize: 18 }}>{itemData.item.eventName}</Text>
                        </Button>
                    </View>

                )}
            />
            {/* dates */}
            <Modal
                animationType='slide'
                visible={displayLectureModal || displayQuizModal || displayTestModal || displayWorkshopModal}
                onRequestClose={() => {
                    setDisplayLectureModal(false);
                    setDisplayQuizModal(false);
                    setDisplayTestModal(false);
                    setDisplayWorkshopModal(false);
                }}
            >
                <View style={styles.dateModal}>
                    <Text style={{ alignContent: 'center', padding: 10, fontSize: 20 }}>Select a Date</Text>
                    <ActivityIndicator animating={!datesLoaded} />
                    <FlatList
                        data={modalDates}
                        renderItem={(itemData, index) => (
                            <View style={styles.listItem}>
                                <Button
                                    full
                                    style={{ backgroundColor: '#009688', borderRadius: 6 }}
                                    onPress={() => {
                                        setSelectedDate(itemData.item.value);
                                        if (displayLectureModal)
                                            setSelectedEventType('lecture');
                                        else if (displayQuizModal)
                                            setSelectedEventType('quiz');
                                        else if (displayTestModal)
                                            setSelectedEventType('test')
                                        else if (displayWorkshopModal)
                                            setSelectedEventType('workshop');
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 18 }}>{itemData.item.value}</Text>
                                </Button>
                            </View>
                        )}
                    />
                </View>
            </Modal>
            {/* event-name */}
            <Modal
                animationType='slide'
                visible={selectedEventType !== undefined ? true : false}
                onRequestClose={() => setSelectedEventType()}
            >
                <View style={styles.displayEventsModal}>
                    <Text style={{ alignContent: 'center', padding: 10, fontSize: 20 }}>{`Select a ${selectedEventType}`}</Text>
                    <ActivityIndicator animating={!datesLoaded} />
                    <FlatList
                        data={event}
                        renderItem={(itemData, index) => (
                            <View style={styles.listItem}>
                                <Button
                                    full
                                    style={{ backgroundColor: '#009688', borderRadius: 6 }}
                                    onPress={() => {
                                        setDisplayAttendanceModal(true);
                                        getAttendance(itemData.item.value);
                                    }}
                                >
                                    <Text style={{ color: 'white', padding: 10, fontSize: 18 }}>{itemData.item.value}</Text>
                                </Button>
                            </View>
                        )}
                    />
                </View>
            </Modal>
            {/* attendance */}
            <Modal
                animationType='slide'
                visible={displayAttendanceModal}
                onRequestClose={() => setDisplayAttendanceModal(false)}
            >
                <View style={styles.displayAttendanceModal}>
                    <ActivityIndicator animating={!attendanceLoaded} />
                    {attendanceLoaded && attendance.length >= 1
                        ?
                        <FlatList
                            data={attendance}
                            renderItem={(itemData, index) => (
                                <View style={styles.attendanceListItem}>
                                    <Card style={itemData.item.attendanceMarked === true ? { padding: 10, backgroundColor: '#66bb6a' } : { padding: 10, backgroundColor: '#4fc3f7' }} >
                                        < Text style={{ fontSize: 20 }}>Reg No : {itemData.item.studentRegNumber}</Text>
                                        <Text style={{ fontSize: 20 }}>Name :  {itemData.item.studentName}</Text>
                                        <Text style={{ fontSize: 20 }}>Comment : {itemData.item.comment}</Text>
                                        <Text style={{ fontSize: 20 }}>Time : {itemData.item.time}</Text>
                                        <Text style={{ fontSize: 20 }}>Attendance Marked : {itemData.item.attendanceMarked === true ? 'true' : 'false'}</Text>
                                    </Card>
                                </View>
                            )}
                        />
                        :
                        <Text>No data found</Text>
                    }
                    <Button
                        full
                        style={attendance !== undefined && attendance.length < 1 ? { backgroundColor: '#bdbdbd', borderRadius: 6 } : { backgroundColor: '#009688', borderRadius: 6 }}
                        disabled={attendance !== undefined && attendance.length < 1}
                        onPress={() => exportAttendance()}
                    >
                        <Text style={{ color: 'white' }}>Export Attendance</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        flex: 1,
        margin: 5,
        width: 200
    },
    dateModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    displayEventsModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    displayAttendanceModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    attendanceListItem: {
        padding: 10
    },

});

export default ViewAttendanceByEventScreen;