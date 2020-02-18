import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import firebaseWrapper from '../components/firebaseWrapper';

const ViewAttendanceByLectureScreen = props => {

    const selectedDate = props.navigation.getParam('date', undefined);
    const username = props.navigation.getParam('username', undefined);

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [lectures, setLectures] = useState([]);

    const handleLectureButtonPress = lectureName => {
        props.navigation.navigate('ViewAttendanceByStudents', { username: username, date: selectedDate, lecture: lectureName });
    }

    useEffect(() => {
        if (!dataLoaded) {
            firebaseWrapper.ViewAttendanceByLecture(username, selectedDate, setData, setDataLoaded);
        }
        else {
            let j = 0;
            for (let i in data) {
                setLectures(lectures => [...lectures, { key: `${j}`, lectureName: i }]);
                j++;
            }
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

export default ViewAttendanceByLectureScreen;