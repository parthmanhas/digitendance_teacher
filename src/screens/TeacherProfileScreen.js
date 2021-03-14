import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as colors from '../constants/colors';
import store from '../store/store';

const TeacherProfileScreen = props => {

    //create event button
    //view attendance


    // const username = props.navigation.getParam('email', 'Teacher').split('@')[0];
    const username = store.getState().username.username;
    

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Welcome {username}</Text>
                </View>
                <Button
                    full
                    success
                    style={{ ...styles.button, backgroundColor: '#009688' }}
                    onPress={() => props.navigation.navigate('Event')}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Create Event</Text>
                </Button>
                <Button
                    full
                    success
                    style={{ ...styles.button, backgroundColor: '#009688' }}
                    onPress={() => props.navigation.navigate('ViewAttendanceByEventScreen', { username: username })}>
                    <Text style={{ color: 'white', fontSize: 18 }}>View Attendance</Text>
                </Button>
                {/* <Button
                    full
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('ExportAttendance', { username: username })}
                >
                    <Text style={{ color: 'white' }}>Export Attendance</Text>
                </Button>
                <Button
                    full
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('AllEventsTaken')}
                >
                    <Text style={{ color: 'white' }}>View All Events Taken</Text>
                </Button> */}
            </View>

        </View>
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
        justifyContent: 'center',
    },
    button: {
        margin: 10,
        borderRadius: 6
    },
    textContainer:{        
        alignItems: 'center',
        paddingVertical: 20
    }
});

export default TeacherProfileScreen;