import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import store from '../store/store';

const TeacherProfileScreen = props => {

    //create event button
    //view attendance

    const username = props.navigation.getParam('email', 'Teacher').split('@')[0];

    return (
        <Container style={styles.screen}>
            <View style={styles.informationDisplayContainer}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>WELCOME {username}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    full
                    rounded
                    success
                    style={{ margin: 10 }}
                    onPress={() => props.navigation.navigate('Event')}>
                    <Text style={{ color: 'white' }}>Create Event</Text>
                </Button>
                <Button
                    full
                    rounded
                    success
                    style={{ margin: 10 }}
                    onPress={() => props.navigation.navigate('ViewAttendanceByDate', {username:username})}>
                    <Text style={{ color: 'white' }}>View Attendance</Text>
                </Button>
            </View>

        </Container>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
    },
    informationDisplayContainer:{
        margin: 10,
        padding:10,
        alignItems:'center',
    }
});

export default TeacherProfileScreen;