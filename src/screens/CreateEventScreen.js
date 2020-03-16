import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Picker, TextInput, Modal } from 'react-native';
import EventDisplayModal from '../components/EventDisplayModal';
import ActiveDisplayModal from '../components/ActiveDisplayModal';

const CreateEventScreen = props => {

    const username = props.navigation.getParam('email', 'Teacher');

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

    useEffect(() => {
        checkValidInput();
    }, [newEventName, newEventDate, newEventSecret, newEventTime]);

    return (
        <View style={styles.screen}>
            <Text style={{ margin: 15, fontSize: 22, fontWeight: 'bold', marginBottom: 30 }}>CREATE EVENT</Text>
            <Picker
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
            <View style={styles.displayInformationContainer}>
                <Text>{newEventName ? `Event Name : ${newEventName}` : ''}</Text>
                <Text>{newEventDate ? `Event Date : ${newEventDate}` : ''}</Text>
                <Text>{newEventTime ? `Event Time : ${newEventTime}` : ''}</Text>
                <Text>{newEventSecret ? `Event Secret : ${newEventSecret}` : ''}</Text>
                <Text>{newEventExpiryTime ? `QR Code Expiry Time : ${newEventExpiryTime}` : ''}</Text>
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
                onButtonPress={onEventModalDoneButtonPress} />
            {/* TEST OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.test}
                title='Test'
                setDisplayModal={setDisplayModal}
                handleInputChange={handleInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={onEventModalDoneButtonPress} />
            {/* WORKSHOP OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.workshop}
                title='Workshop'
                setDisplayModal={setDisplayModal}
                handleInputChange={handleInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={onEventModalDoneButtonPress} />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button style={{ margin: 10 }}
                        disabled={disableResetButton}
                        title='Reset'
                        color='red'
                        onPress={handleResetButton} />
                </View>
                <View style={styles.button}>
                    <Button title="GENERATE QR CODE" disabled={disableGenerateButton} onPress={() => {
                        props.navigation.navigate('QRCodeGenerated', {
                            eventName: newEventName,
                            eventDate: newEventDate,
                            eventSecret: newEventSecret,
                            eventTime: newEventTime
                        });
                    }
                    } />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    picker: {
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        backgroundColor: '#efefef',
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    displayInformationContainer: {
        padding: 20,
        margin: 20,

    },
    buttonContainer: {
        padding: 20,
        margin: 10
    },
    button: {
        margin: 5
    }
});

export default CreateEventScreen;

