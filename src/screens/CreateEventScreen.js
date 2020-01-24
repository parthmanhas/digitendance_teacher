import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Picker } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CreateEventScreen = props => {

    const [pickerSelection, setPickerSelection] = useState('Select Event');

    const [renderModal, setRenderModal] = useState();


    const displayRenderModal = (itemValue) => {
        switch (itemValue) {
            case 'lecture':
                setRenderModal(
                    <View style={styles.inputContainer}>
                        <Text>LECTURE OPTIONS</Text>
                        <TextInput placeholder="Enter Lecture Name" />
                        <TextInput placeholder="Enter Date" />
                        <TextInput placeholder="Enter Secret Key" />
                    </View>
                );
                break;
            case 'quiz':
                setRenderModal(
                    <View style={styles.inputContainer}>
                        <Text>QUIZ OPTIONS</Text>
                        <TextInput placeholder="Enter Quiz Name" />
                        <TextInput placeholder="Enter Date" />
                        <TextInput placeholder="Enter Secret Key" />
                    </View>
                );
                break;
            case 'test':
                setRenderModal(
                    <View style={styles.inputContainer}>
                        <Text>TEST OPTIONS</Text>
                        <TextInput placeholder="Enter Test Name" />
                        <TextInput placeholder="Enter Date" />
                        <TextInput placeholder="Enter Secret Key" />
                    </View>
                );
                break;
            case 'workshop':
                setRenderModal(
                    <View style={styles.inputContainer}>
                        <Text>WORKSHOP OPTIONS</Text>
                        <TextInput placeholder="Enter WorkShop Name" />
                        <TextInput placeholder="Enter Date" />
                        <TextInput placeholder="Enter Secret Key" />
                    </View>
                );
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
            {renderModal}
            <Button title="GENERATE QR CODE" onPress={() => {
                props.navigation.navigate('QRCodeGenerated')
            }} />
            
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
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        backgroundColor: '#efefef',
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CreateEventScreen;