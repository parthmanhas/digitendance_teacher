import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as firebase from 'firebase';


const ViewAttendanceByDateScreen = props => {

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    const username = props.navigation.getParam('username', 'Teacher');
    firebase.database().ref(username).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        });

    let dates = [];
    let j = 0;
    for (var i in data) {
        dates.push({ date: i, key: j });
        j++;
    }

    dates.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    })

    const handleDateButtonPress = (date) => {
        props.navigation.navigate('ViewAttendanceByLecture', {date:date, username:username});
    }
    return (
        <View style={styles.screen}>
            <Text>Select A Date</Text>
            <ActivityIndicator animating={!dataLoaded} />
            <FlatList
                data={dates}
                renderItem={(itemData, index) => (
                    <View style={styles.listItem}>
                        <Button
                            full
                            rounded
                            success
                            onPress={() => handleDateButtonPress(itemData.item.date)}
                        >
                            <Text style={{ color: 'white', padding: 10 }}>{itemData.item.date}</Text>
                        </Button>
                    </View>

                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem: {
        flex: 1,
        margin: 5
    }

});

export default ViewAttendanceByDateScreen;