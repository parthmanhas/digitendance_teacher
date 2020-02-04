import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { DatePicker } from 'native-base';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

const EventDisplayModal = props => {

    return (

        <Modal //WORKSHOP OPTIONS
            onBackdropPress={props.handleModalBackdrop}
            visible={props.displayOption}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.modal}>
                <Text>{props.title} OPTIONS</Text>
                <TextInput placeholder={`Enter ${props.title} Name`}
                    onChangeText={(eventName) => {
                        props.handleInputChange(eventName, props.newEventDate, props.newEventSecret)
                    }
                    }
                    value={props.newEventName} />
                {/* <TextInput placeholder="Enter Date"
                    onChangeText={(eventDate) =>
                        props.handleInputChange(props.newEventName, eventDate, props.newEventSecret)
                    }
                    value={props.newEventDate}
                /> */}
                <DatePicker
                    defaultDate={new Date()}
                    locale={"en"}
                    modalTransparent={false}
                    animationType={"fade"}
                    
                    androidMode={"calendar"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={(date) => props.handleInputChange(props.newEventName, date, props.newEventSecret)}
                    disabled={false}
                />
                <TextInput placeholder="Enter Secret Key"
                    onChangeText={(eventSecret) =>
                        props.handleInputChange(props.newEventName, props.newEventDate, eventSecret)
                    }
                    value={props.newEventSecret}
                />
                <Button title='Done' onPress={props.onButtonPress} />
            </View>

        </Modal>


    );
};

const styles = StyleSheet.create({
    modal: {
        padding: 40,
        backgroundColor: '#efefef',
        alignItems: 'center',
        bottom: 20,
        left: 20,
        right: 20,
        position: 'absolute'
    },
});

export default EventDisplayModal;