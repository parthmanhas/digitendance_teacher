import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, TextInput, Modal } from 'react-native';
import { Button } from 'native-base';
import *  as colors from '../constants/colors';

const CreateEventScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>Select a Class</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND
    }
})

export default CreateEventScreen;

