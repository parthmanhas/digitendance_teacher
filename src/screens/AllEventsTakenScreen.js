import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import * as colors from '../constants/colors';

const AllEventsTakenScreen = props => {
    return (
        <View style={styles.screen}>
            <View>
                <Button
                    full
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('AllLecturesTaken')}
                >
                    <Text style={{ color: 'white' }}>View All Lectures Taken</Text>
                </Button>
                <Button
                    full
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('AllTestTaken')}
                >
                    <Text style={{ color: 'white' }}>View All Tests Taken</Text>
                </Button>
                <Button
                    full
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('AllQuizTaken')}
                >
                    <Text style={{ color: 'white' }}>View All Quiz Taken</Text>
                </Button>
                <Button
                    full
                    style={{ ...styles.button, backgroundColor: colors.BUTTON_DARK }}
                    onPress={() => props.navigation.navigate('AllWorkshopTaken')}
                >
                    <Text style={{ color: 'white' }}>View All Workshop Taken</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.BACKGROUND,
        justifyContent: 'center'
    },
    button: {
        margin: 10,
        borderRadius: 6
    }
});

export default AllEventsTakenScreen;