import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as firebaseWrapper from '../components/firebaseWrapper';

const ViewAttendanceBySubEventScreen = props => {

    // const selectedDate = props.navigation.getParam('date', undefined);
    // const username = props.navigation.getParam('username', undefined);

    const eventName = props.navigation.getParam('eventName', undefined);

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [lectures, setLectures] = useState([]);

    const handleLectureButtonPress = lectureName => {
        props.navigation.navigate('ViewAttendanceByStudents', { username: username, date: selectedDate, lecture: lectureName });
    }

    useEffect(() => {
        if (!dataLoaded) {
            firebaseWrapper.ViewAttendanceBySubEvent(selectedDate)
                .then((data) => {
                    let tmp = [];
                    let j = 0;
                    Object.entries(data).forEach(([k, v]) => {
                        tmp.push({ key: `${j}`, eventName: k });
                        j++;
                    })
                    tmp.sort();
                    setSubEvents(tmp);
                    setDataLoaded(true);
                })
                .catch(err => {
                    throw new Error('error', err.message);
                })

        }
        else {
            let j = 0;
            let getData = [];
            for (let i in data) {
                getData.push({ key: `${j}`, lectureName: i });
                j++;
            }
            setLectures(getData);
        }

    }, [dataLoaded]);

    return (
        <View>
            <Text style={styles.header}>{selectedDate ? selectedDate : 'NO SUCH DATE EXISTS'}</Text>
            <View>
                <ActivityIndicator animating={!dataLoaded} />
                <FlatList
                    data={lectures}
                    renderItem={(itemData, index) => (
                        <View style={styles.listItem}>
                            <Button
                                full
                                rounded
                                onPress={() => handleLectureButtonPress(itemData.item.lectureName)}
                            >
                                <Text style={{ color: 'white', padding: 10 }}>{itemData.item.lectureName}</Text>
                            </Button>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        margin: 10,
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    listItem: {
        margin: 5
    }
});

export default ViewAttendanceBySubEventScreen;