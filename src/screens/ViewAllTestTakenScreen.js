import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as colors from '../constants/colors';
import * as firebaseWrapper from '../components/firebaseWrapper';

const ViewAllTestTakenScreen = props => {


    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        if (!dataLoaded)
            firebaseWrapper.ViewAllTestTaken(setData, setDataLoaded);
        else if (lectures.length == 0) {
            let j = 0;
            let getLectures = []
            for (var i in data) {
                getLectures.push({ key: `${j}`, lectureName: i });
                // console.log(getDates);
                j++;
            }
            setLectures(getLectures);
        }
    });



    return (
        <View style={styles.screen}>
            <Text style={{ margin: 15, fontSize: 22, fontWeight: 'bold', marginBottom: 30 }}>Select A Test to view its attendance</Text>
            <ActivityIndicator animating={!dataLoaded} />
            <FlatList
                data={lectures}
                renderItem={(itemData, index) => (
                    <View style={styles.listItem}>
                        <Button
                            full
                            rounded
                            success
                            onPress={() => { }}
                        >
                            <Text style={{ color: 'white', padding: 10 }}>{itemData.item.lectureName}</Text>
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
        backgroundColor: colors.BACKGROUND,
        justifyContent: 'center'
    },
    listItem: {
        flex: 1,
        margin: 5
    }
});

export default ViewAllTestTakenScreen;