import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Button } from 'react-native';

const EventDisplayModal = props => {
    return (
        <Modal //WORKSHOP OPTIONS
            visible={props.displayOption}
            animationType='fade'
            transparent={true}>
            <View style={styles.modal}>
                <Text>{props.title} OPTIONS</Text>
                <TextInput placeholder={`Enter ${props.title} Name`}
                    onChangeText={props.handleNameInputChange}
                    value={props.newEventName} />
                <TextInput placeholder="Enter Date"
                    onChangeText={props.handleDateInputChange}
                    value={props.newEventDate}
                />
                <TextInput placeholder="Enter Secret Key"
                    onChangeText={props.handleSecretInputChange}
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