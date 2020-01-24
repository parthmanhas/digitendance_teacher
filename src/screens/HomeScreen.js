import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = props => {



    return (
        <View style={styles.screen}>
            <Text>WELCOME TO DIGITENDANCE!</Text>
            <Button title="Create Event" onPress={() => {
                props.navigation.navigate('Event')
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeScreen;