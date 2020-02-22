console.ignoredYellowBox = ['Setting a timer'];

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as firebaseWrapper from '../components/firebaseWrapper';


const ViewAttendanceByDateScreen = props => {

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dates, setDates] = useState([]);

    const username = props.navigation.getParam('username', 'Teacher');

    dates.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    })

    const handleDateButtonPress = (date) => {
        props.navigation.navigate('ViewAttendanceByLecture', { date: date, username: username });
    }

    useEffect(() => {
        if (!dataLoaded) {
            firebaseWrapper.ViewAttendanceByDate(username, setData, setDataLoaded);
        }
        else if(dates.length == 0) {
            let j = 0;
            let getDates = []
            for (var i in data) {
                
                getDates.push({key : `${j}`, date: i});
                console.log(getDates);
                j++;
            }
            setDates(getDates);
        }
        console.log(dates);

    }, [dataLoaded]);
    return (
        <View style={styles.screen}>
            <Text style={{ margin: 15, fontSize: 22, fontWeight: 'bold', marginBottom: 30 }}>Select A Date</Text>
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