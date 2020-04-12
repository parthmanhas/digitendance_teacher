import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, TextInput, Modal } from 'react-native';
import { Button } from 'native-base';
import *  as colors from '../constants/colors';

const CreateEventScreen = props => {

    return (
        <View style={styles.buttonContainer}>
            <Button
                full
                success
                style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                onPress={() => props.navigation.navigate('CreateStandAloneEvent')}>
                <Text style={{ color: 'white' }}>Create StandAlone Event</Text>
            </Button>
            <Button
                full
                success
                style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                onPress={() => props.navigation.navigate('CreateClassEvent')}>
                <Text style={{ color: 'white' }}>Create Class Event</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND
    },
    button: {
        margin: 10,
        borderRadius: 6
    },
    buttonContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
    },
})

export default CreateEventScreen;

