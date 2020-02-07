import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';


const ViewAttendanceScreen = props => {

    //fetch data from server
    //display into list

    const [data, setData] = useState();

    const username = props.navigation.getParam('username', 'Teacher');
    firebase.database().ref(username).once('value')
        .then((snap) => {
            setData(snap.val());
        });
    console.log(data);
    return (
        <View>
            <Text>ATTENDANCE HERE!</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item
                        id={item.id}
                        title={item.title}
                    />
                )}
                keyExtractor={item => item.id}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    }
});

export default ViewAttendanceScreen;