import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Picker, TextInput, Modal } from 'react-native';
import EventDisplayModal from '../components/EventDisplayModal';

const CreateEventScreen = props => {

    const [pickerSelection, setPickerSelection] = useState('Select Event');

    const [renderModal, setRenderModal] = useState();

    const [newEventName, setNewEventName] = useState();
    const [newEventDate, setNewEventDate] = useState();
    const [newEventSecret, setNewEventSecret] = useState();
    const [disableResetButton, setDisableResetButton] = useState(true);
    const [disableGenerateButton, setdisableGenerateButton] = useState(true);
    const [displayModal, setDisplayModal] = useState({
        'lecture': false,
        'quiz': false,
        'workshop': false,
        'test': false
    });

    const handleNameInputChange = (text) => {
        setNewEventName(text);
    }
    const handleDateInputChange = (text) => {
        setNewEventDate(text);
    }
    const handleSecretInputChange = (text) => {
        setNewEventSecret(text);
    }

    const checkValidInput = () => {
        if (newEventName && newEventDate && newEventSecret) {
            setdisableGenerateButton(false);
            setDisableResetButton(false);
        }
    }

    const handleResetButton = () => {
        setNewEventName();
        setNewEventDate();
        setNewEventSecret();
        setDisableResetButton(true);
        setdisableGenerateButton(true);
    }

    const displayRenderModal = (itemValue) => {
        switch (itemValue) {
            case 'lecture':
                setDisplayModal({
                    'lecture': true,
                    'quiz': false,
                    'workshop': false,
                    'test': false
                });
                break;
            case 'quiz':
                setDisplayModal({
                    'lecture': false,
                    'quiz': true,
                    'workshop': false,
                    'test': false
                });
                break;
            case 'test':
                setDisplayModal({
                    'lecture': false,
                    'quiz': false,
                    'workshop': false,
                    'test': true
                });
                break;
            case 'workshop':
                setDisplayModal({
                    'lecture': false,
                    'quiz': false,
                    'workshop': true,
                    'test': false
                });
                break;
            default:
                console.error('ERROR! BOY!');
        }
    };



    return (
        <View style={styles.screen}>
            <Text>CREATE EVENT</Text>
            <Picker
                selectedValue={pickerSelection}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                    setPickerSelection(itemValue);
                    displayRenderModal(itemValue);
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
                <Text>{newEventSecret ? `Event Secret : ${newEventSecret}` : ''}</Text>
            </View>
            {/* LECTURE OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.lecture}
                title='Lecture'
                handleNameInputChange={handleNameInputChange}
                handleDateInputChange={handleDateInputChange}
                handleSecretInputChange={handleSecretInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={() => {
                    setDisplayModal({
                        'lecture': false,
                        'quiz': false,
                        'workshop': false,
                        'test': false
                    });
                    setPickerSelection('Select Default');
                    checkValidInput();
                }}
            />
            {/* QUIZ OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.quiz}
                title='Quiz'
                handleNameInputChange={handleNameInputChange}
                handleDateInputChange={handleDateInputChange}
                handleSecretInputChange={handleSecretInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={() => {
                    setDisplayModal({
                        'lecture': false,
                        'quiz': false,
                        'workshop': false,
                        'test': false
                    });
                    setPickerSelection('Select Default');
                    checkValidInput();
                }} />
            {/* TEST OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.test}
                title='Test'
                handleNameInputChange={handleNameInputChange}
                handleDateInputChange={handleDateInputChange}
                handleSecretInputChange={handleSecretInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={() => {
                    setDisplayModal({
                        'lecture': false,
                        'quiz': false,
                        'workshop': false,
                        'test': false
                    });
                    setPickerSelection('Select Default');
                    checkValidInput();
                }} />
            {/* WORKSHOP OPTIONS */}
            <EventDisplayModal
                displayOption={displayModal.workshop}
                title='Workshop'
                handleNameInputChange={handleNameInputChange}
                handleDateInputChange={handleDateInputChange}
                handleSecretInputChange={handleSecretInputChange}
                newEventName={newEventName}
                newEventDate={newEventDate}
                newEventSecret={newEventSecret}
                onButtonPress={() => {
                    setDisplayModal({
                        'lecture': false,
                        'quiz': false,
                        'workshop': false,
                        'test': false
                    });
                    setPickerSelection('Select Default');
                    checkValidInput();
                }} />
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
                            data1: newEventName,
                            data2: newEventDate,
                            data3: newEventSecret
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
        padding: 20
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
    modal: {
        padding: 40,
        backgroundColor: '#efefef',
        alignItems: 'center',
        bottom: 20,
        left: 20,
        right: 20,
        position: 'absolute'
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

