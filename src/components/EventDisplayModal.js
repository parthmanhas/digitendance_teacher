import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import Modal from 'react-native-modal';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const modalFontSize = 18;

const EventDisplayModal = props => {

    const [eventName, setEventName] = useState();
    const [eventDate, setEventDate] = useState();
    const [eventSecret, setEventSecret] = useState();
    const [eventTime, setEventTime] = useState();
    const [displayDatePicker, setDisplayDatePicker] = useState(false);
    const [displayTimePicker, setDisplayTimePicker] = useState(false);
    const [expiryTime, setExpiryTime] = useState();
    const [displayExpiryTimePicker, setDisplayExpiryTimePicker] = useState(false);


    const selectDate = () => {
        setDisplayDatePicker(true);
    }

    const selectTime = () => {
        setDisplayTimePicker(true);
    }

    const handleTimeConfirm = (time) => {
        setDisplayTimePicker(false);
        setEventTime(time.toString().substr(15, 6));
    }

    const handleTimeCancel = () => {
        setDisplayTimePicker(false);
    }

    const handleDateConfirm = (date) => {
        setDisplayDatePicker(false);
        setEventDate(date.toString().substr(0, 15));
        props.handleInputChange(props.newEventName, date, props.newEventSecret);
    }

    const handleDateCancel = () => {
        setDisplayDatePicker(false);

    }

    const handleModalDoneButton = () => {
        props.setEventType(props.eventType);
        props.handleInputChange(eventName, eventDate, eventSecret, eventTime, expiryTime);
        props.onButtonPress();
    }

    const handleResetButton = () => {
        setEventDate();
        setEventName();
        setEventSecret();
        setEventTime();
        setExpiryTime();
    }

    const handleExpiryTimeConfirm = (time) => {
        setDisplayExpiryTimePicker(false);
        setExpiryTime(time.toString().substr(15, 6));
    }

    const handleExpiryTimeCancel = () => {
        setDisplayExpiryTimePicker(false);
    }

    const selectExpiryTime = () => {
        setDisplayExpiryTimePicker(true);
    }

    useEffect(() => {
        props.handleInputChange(eventName, eventDate, eventSecret, eventTime);
    }, [eventName, eventDate, eventSecret, eventTime]);

    return (
        <Modal
            style={styles.modal}
            visible={props.displayOption}
            onRequestClose={props.onButtonPress}
            animationType='fade'>
            <View style={styles.content}>
                <View style={{ margin: 15 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{props.title} Options</Text>
                </View>
                <TextInput
                    style={{ textAlign: 'center', fontSize: modalFontSize }}
                    placeholder={`Enter ${props.title} Name`}
                    onChangeText={(eventName) => { setEventName(eventName) }}
                    value={eventName}

                />

                <TouchableOpacity style={{ marginBottom: 10 }} onPress={selectDate}>
                    <Text style={{ fontSize: modalFontSize }}>{eventDate ? eventDate.toString() : "Select Date"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={selectTime}>
                    <Text style={{ fontSize: modalFontSize }}>{eventTime ? eventTime.toString() : "Select Time"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={selectExpiryTime}>
                    <Text style={{ fontSize: modalFontSize }}>{expiryTime ? expiryTime.toString() : "Select QR Expiry Time"}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={displayDatePicker}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={handleDateCancel}
                />
                
                <DateTimePickerModal
                    isVisible={displayTimePicker}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={handleTimeCancel}
                />
                
                <DateTimePickerModal
                    isVisible={displayExpiryTimePicker}
                    mode="time"
                    onConfirm={handleExpiryTimeConfirm}
                    onCancel={handleExpiryTimeCancel}
                />

                <TextInput
                    placeholder="Enter Secret Key"
                    onChangeText={(eventSecret) => setEventSecret(eventSecret)}
                    value={eventSecret}
                    style={{ textAlign: 'center', fontSize: modalFontSize }}
                />

            </View>
            <View>
                <View>
                    <Button
                        full
                        style={{ ...styles.button, backgroundColor: '#2196F3' }}
                        onPress={handleModalDoneButton}
                    >
                        <Text style={{ color: 'white' }}>DONE</Text>
                    </Button>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>
                    <Button
                        full
                        warning
                        style={{ ...styles.button, width: '50%', marginHorizontal: 5 }}
                        onPress={props.onButtonPress}
                    >
                        <Text style={{ color: 'white' }} >CLOSE</Text>
                    </Button>
                    <Button
                        full
                        danger
                        style={{ ...styles.button, width: '50%', marginHorizontal: 5 }}
                        onPress={handleResetButton}
                    >
                        <Text style={{ color: 'white' }} >RESET</Text>
                    </Button>
                </View>



            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        margin: 0
    },
    content: {
        alignItems: 'center'
    },
    button: {
        borderRadius: 5,
        margin: 10
    }
});

export default EventDisplayModal;

{/* <TextInput placeholder="Enter Date"
                    onChangeText={(eventDate) =>
                        props.handleInputChange(props.newEventName, eventDate, props.newEventSecret)
                    }
                    value={props.newEventDate}
                /> */}
