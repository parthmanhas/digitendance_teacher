import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import firebaseWrapper from '../components/firebaseWrapper';

const ViewAttendanceByStudentsScreen = props => {

    const date = props.navigation.getParam('date', undefined);
    const username = props.navigation.getParam('username', undefined);
    const lecture = props.navigation.getParam('lecture', undefined);

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        if (!dataLoaded) {
            firebaseWrapper.ViewAttendanceByStudent(username, date, lecture, setDataLoaded);
        }
        else {
            for (let i in data) {
                if(i != "init")
                    setStudents(students => [...students, { key: i, student: `${data[i]['regNumber']} ${data[i]['name']}` }]);
            }
            
        }
    }, [dataLoaded]);

    return (
        <View style={styles.screen}>
            <Text>{date}</Text>
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