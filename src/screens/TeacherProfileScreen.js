import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as colors from '../constants/colors';

const TeacherProfileScreen = props => {

    //create event button
    //view attendance

    const username = props.navigation.getParam('email', 'Teacher').split('@')[0];

    return (
        <Container style={styles.screen}>
            <View style={styles.informationDisplayContainer}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>WELCOME {username}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    full
                    success
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('Event')}>
                    <Text style={{ color: 'white' }}>Create Event</Text>
                </Button>
                <Button
                    full
                    success
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('ViewAttendanceByDate', { username: username })}>
                    <Text style={{ color: 'white' }}>View Attendance</Text>
                </Button>
                <Button
                    full
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('ExportAttendance', { username: username })}
                >
                    <Text style={{ color: 'white' }}>Export Attendance</Text>
                </Button>
            </View>

        </Container>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.BACKGROUND
    },
    buttonContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
    },
    informationDisplayContainer: {
        margin: 10,
        padding: 10,
        alignItems: 'center',
    },
    button: {
        margin: 10,
        borderRadius: 6
    }
});

export default TeacherProfileScreen;