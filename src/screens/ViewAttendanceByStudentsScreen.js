import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as firebaseWrapper from '../components/firebaseWrapper';

const ViewAttendanceByStudentsScreen = props => {

    const date = props.navigation.getParam('date', undefined);
    const username = props.navigation.getParam('username', undefined);
    const lecture = props.navigation.getParam('lecture', undefined);

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [students, setStudents] = useState([]);

    students.sort((a, b) => {
        return Number(a.studentRegNumber) - Number(b.studentRegNumber);
    })

    useEffect(() => {
        if (!dataLoaded) {
            firebaseWrapper.ViewAttendanceByStudent(username, setData, date, lecture, setDataLoaded);
        }
        else if (students.length == 0) {
            let getStudents = [];
            for (let i in data) {
                if (i != "init")
                    getStudents.push({
                        key: i,
                        studentRegNumber: `${data[i]['regNumber']}`,
                        studentName: `${data[i]['name']}`
                    })

            }
            if (getStudents.length == 0)
                getStudents.push({
                    key: 'qiqwndfasonf',
                    studentRegNumber: 'No',
                    studentName: 'Data'
                })
            setStudents(getStudents);

        }
    }, [dataLoaded]);

    return (
        <View style={styles.screen}>
            <Text style={styles.header}>{date}</Text>
            <View>
                <ActivityIndicator animating={!dataLoaded} />
                <FlatList
                    data={students}
                    renderItem={(itemData, index) => (
                        <View style={styles.listItem}>
                            <Text style={{ fontSize: 22 }}>{`${itemData.item.studentRegNumber} ${itemData.item.studentName}`}</Text>
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
        padding: 20
    },
    header: {
        margin: 10,
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    listItem: {
        margin: 5,

    }
});

export default ViewAttendanceByStudentsScreen;