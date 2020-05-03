import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, TextInput, Modal, Alert, ActivityIndicator } from 'react-native';
import EventDisplayModal from '../components/EventDisplayModal';
import ActiveDisplayModal from '../components/ActiveDisplayModal';
import store from '../store/store';
import { setEventDetails } from '../store/actions/eventDetails';
import * as firebase from 'firebase';
import * as firebaseWrapper from '../components/firebaseWrapper';
import { Button } from 'native-base';
import { set } from 'react-native-reanimated';


const CreateEventStandAloneEnterDetailsScreen = props => {

    const username = props.navigation.getParam('email', 'Teacher');

    const className = props.navigation.getParam('className', 'none');

    const [pickerSelection, setPickerSelection] = useState('Select Event');

    const [renderModal, setRenderModal] = useState();

    const [newEventName, setNewEventName] = useState();
    const [newEventDate, setNewEventDate] = useState();
    const [newEventSecret, setNewEventSecret] = useState();
    const [newEventTime, setNewEventTime] = useState();
    const [newEventExpiryTime, setNewEventExpiryTime] = useState();
    const [disableResetButton, setDisableResetButton] = useState(true);
    const [disableGenerateButton, setdisableGenerateButton] = useState(true);
    const [displayModal, setDisplayModal] = useState(ActiveDisplayModal);
    const [activityIndicator, setActivityIndicator] = useState(false);

    const [eventType, setEventType] = useState();

    const checkValidInput = () => {

        if (newEventName && newEventDate && newEventSecret && newEventTime) {
            setdisableGenerateButton(false);
            setDisableResetButton(false);
        }
        else if (newEventName || newEventDate || newEventSecret || newEventTime) {
            setDisableResetButton(false);
        }
    }

    const handleResetButton = () => {
        setNewEventName();
        setNewEventDate();
        setNewEventSecret();
        setNewEventTime();
        setNewEventExpiryTime();
        setDisableResetButton(true);
        setdisableGenerateButton(true);
        setEventType();
    }

    const handleModalBackdrop = () => {
        setDisplayModal(ActiveDisplayModal);
        setPickerSelection('Select Default');
    }

    const onEventModalDoneButtonPress = () => {
        setDisplayModal(ActiveDisplayModal);
        setPickerSelection('Select Default');
        checkValidInput();
    }


    const handleInputChange = (eventName, eventDate, eventSecret, eventTime, expiryTime) => {
        setNewEventName(eventName);
        setNewEventDate(eventDate);
        setNewEventSecret(eventSecret);
        setNewEventTime(eventTime);
        setNewEventExpiryTime(expiryTime);
    }

    const handleGenerateQRCode = () => {
        setdisableGenerateButton(true);
        setDisableResetButton(true);
        setActivityIndicator(true);
        let eventDetails = {
            eventName: newEventName,
            eventDate: newEventDate,
            eventSecret: newEventSecret,
            eventTime: newEventTime,
            expiryTime: newEventExpiryTime,
            eventType: eventType
        }

        store.dispatch(setEventDetails(eventDetails));
        // console.log(store.getState());        

        if (className === 'none')
            props.navigation.navigate('DisplayStandAloneEventQRCodeScreen');
        else {
            firebaseWrapper.AddEvent()
                .then(() => {
                    const e = store.getState().eventDetails;
                    const eventName = e.eventName;
                    const eventDate = e.eventDate;
                    const eventSecret = e.eventSecret;
                    const eventTime = e.eventTime;
                    const expiryTime = e.expiryTime;
                    const eventType = e.eventType;
                    let username = firebase.auth().currentUser.email.split('@')[0];
                    const path = `${username}/${eventType}/${eventDate}/${eventName}`;

                    let data;
                    firebase.database().ref(`${username}/allClasses/${className}`).once('value')
                        .then(snap => {
                            data = snap.val();
                            // Object.keys(data).map(key => {
                            //     let obj = {};
                            //     obj[key] = { ...data[key] };
                            //     firebase.database().ref(path).push().set(obj);
                            // })
                            firebase.database().ref(path).update({ 'attendance': data })
                                .then(() => {
                                    props.navigation.navigate('DisplayClassEventQRCodeScreen', {
                                        className: className
                                    });
                                })
                                .catch(err => err);
                        })
                        .catch(err => {
                            Alert.alert('Error', err.message);
                            setdisableGenerateButton(false);
                        });


                })
        }
    }
    useEffect(() => {
        checkValidInput();
    }, [newEventName, newEventDate, newEventSecret, newEventTime]);

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={{ margin: 15, fontSize: 22, fontWeight: 'bold', marginBottom: 30, alignItems: 'center' }}>CREATE EVENT</Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        mode="dropdown"
                        selectedValue={pickerSelection}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setPickerSelection(itemValue);
                            // displayRenderModal(itemValue);
                            const modal = { ...ActiveDisplayModal };
                            modal[itemValue] = true;
                            setDisplayModal(modal);
                        }}>
                        <Picker.Item label="Select Event" value="" />
                        <Picker.Item label="Lecture" value="lecture" />
                        <Picker.Item label="Quiz" value="quiz" />
                        <Picker.Item label="Test" value="test" />
                        <Picker.Item label="Work Shop" value="workshop" />
                    </Picker>
                </View>
                <View style={styles.displayInformationContainer}>
                    <Text>{newEventName ? `Event Name : ${newEventName}` : ''}</Text>
                    <Text>{newEventDate ? `Event Date : ${newEventDate}` : ''}</Text>
                    <Text>{newEventTime ? `Event Time : ${newEventTime}` : ''}</Text>
                    <Text>{newEventSecret ? `Event Secret : ${newEventSecret}` : ''}</Text>
                    <Text>{newEventExpiryTime ? `QR Code Expiry Time : ${newEventExpiryTime}` : ''}</Text>
                </View>
                <ActivityIndicator animating={activityIndicator}/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        {/* <Button
                                disabled={disableResetButton}
                                title='Reset'
                                color='red'
                                onPress={handleResetButton} /> */}
                        <Button
                            full
                            danger
                            disabled={disableResetButton}
                            onPress={handleResetButton}
                            style={disableResetButton ? { ...styles.button, backgroundColor: '#bdbdbd' } : { ...styles.button, backgroundColor: '#ef5350' }}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>RESET</Text>
                        </Button>
                    </View>
                    <View style={styles.button}>
                        {/* <Button title="GENERATE QR CODE" disabled={disableGenerateButton} onPress={handleGenerateQRCode} /> */}
                        <Button
                            full
                            disabled={disableGenerateButton}
                            onPress={handleGenerateQRCode}
                            style={disableGenerateButton ? { ...styles.button, backgroundColor: '#bdbdbd' } : { ...styles.button, backgroundColor: '#009688' }}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>GENERATE QR CODE</Text>
                        </Button>
                    </View>
                    {/* <View style={styles.button}>
                        <Button title="GENERATE DUMMY QR CODE" onPress={() => {
                            let eventDetails = {
                                eventName: 'dummy',
                                eventDate: 'dummy',
                                eventSecret: 'dummy',
                                eventTime: 'dummy',
                                expiryTime: 'dummy',
                                eventType: 'dummy'
                            }
    
                            store.dispatch(setEventDetails(eventDetails));
                            // console.log(store.getState());        
    
                            if (className === undefined)
                                props.navigation.navigate('QRCodeGenerated');
                            else
                                props.navigation.navigate('DisplayClassEventQRCodeScreen', {
                                    className: className
                                });
                        }} />
                    </View> */}

                </View>
            </View>
            {/* LECTURE OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.lecture}
                title='Lecture'
                setDisplayModal={setDisplayModal}
                handleModalBackdrop={handleModalBackdrop}
                handleInputChange={handleInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={onEventModalDoneButtonPress}
                setEventType={setEventType}
                eventType='lecture'
            />
            {/* QUIZ OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.quiz}
                title='Quiz'
                setDisplayModal={setDisplayModal}
                handleInputChange={handleInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={onEventModalDoneButtonPress}
                setEventType={setEventType}
                eventType='quiz' />
            {/* TEST OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.test}
                title='Test'
                setDisplayModal={setDisplayModal}
                handleInputChange={handleInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={onEventModalDoneButtonPress}
                setEventType={setEventType}
                eventType='test' />
            {/* WORKSHOP OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.workshop}
                title='Workshop'
                setDisplayModal={setDisplayModal}
                handleInputChange={handleInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={onEventModalDoneButtonPress}
                setEventType={setEventType}
                eventType='workshop' />

        </View>
    );
}




const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20
    },
    picker: {
        flexDirection: 'row'
    },
    pickerContainer: {
        alignContent: 'center',
        backgroundColor: '#b2dfdb',
        marginHorizontal: '10%'
    },
    inputContainer: {
        backgroundColor: '#efefef',
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    displayInformationContainer: {
        margin: 20,
        paddingLeft: '25%',
        alignItems: 'flex-start'

    },
    buttonContainer: {

    },
    button: {
        borderRadius: 5,
        marginVertical: 3
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        alignItems: 'center'
    }
});

export default CreateEventStandAloneEnterDetailsScreen;

