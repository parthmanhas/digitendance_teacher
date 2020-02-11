import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as firebase from 'firebase';

const ViewAttendanceByStudentsScreen = props => {

    const date = props.navigation.getParam('date', undefined);
    const username = props.navigation.getParam('username', undefined);
    const lecture = props.navigation.getParam('lecture', undefined);

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    firebase.database().ref(`${username}/${date}/${lecture}`).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        })
        .catch((error) => {
            Alert.alert(error.message);
        })



    let students = [];



    let j = 0;
    for (let i in data) {
        students.push({ key: i, student: `${data[i]['regNumber']} ${data[i]['name']}` });
        j++;
    }

    return (
        <View style={styles.screen}>
            <Text>{date} ATTENDANCE</Text>
            <View>
                <ActivityIndicator animating={!dataLoaded} />
                <FlatList
                    data={students}
                    renderItem={(itemData, index) => (
                        <View style={styles.listItem}>
                            <Text style={{ fontSize: 22 }}>{itemData.item.student}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    listItem: {
        margin: 5,


    }
});

export default ViewAttendanceByStudentsScreen;