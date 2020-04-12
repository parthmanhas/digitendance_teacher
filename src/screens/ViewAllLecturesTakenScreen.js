import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as colors from '../constants/colors';
import * as firebaseWrapper from '../components/firebaseWrapper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ViewAllLectureTakenScreen = props => {


    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [lectures, setLectures] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const [activateSelectAllOption, setActivateSelectAllOption] = useState(false);

    useEffect(() => {
        if (!dataLoaded)
            firebaseWrapper.ViewAllLecturesTaken(setData, setDataLoaded);
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
            <Text style={{ margin: 15, fontSize: 22, fontWeight: 'bold', marginBottom: 30 }}>Select A Lecture to view its attendance</Text>
            <ActivityIndicator animating={!dataLoaded} />
            {activateSelectAllOption
                ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {
                        setActivateSelectAllOption(false);
                        selectedItems.forEach(element => {
                           console.log(element);
                        });
                    }}>
                        <Text style={{ fontSize: 18, paddingVertical: 5 }}>Cancel Select All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('select all')}>
                        <Text style={{ fontSize: 20, paddingVertical: 5 }}>Select All</Text>
                    </TouchableOpacity>
                </View>
                :
                <View></View>}
            <FlatList
                data={lectures ? lectures : ['NO LECTURES TAKEN']}
                renderItem={(itemData, index) => (
                    <View style={styles.listItem}>
                        <Button
                            full
                            onPress={() => {
                                if (activateSelectAllOption) {
                                    itemData.item.selected = !itemData.item.selected;
                                    console.log(itemData)
                                }
                            }}
                            onLongPress={() => {
                                setActivateSelectAllOption(true);
                                itemData.item.selected = !itemData.item.selected;
                                if (itemData.item.selected) {
                                    setSelectedItems((selectedItem) => [...selectedItem, itemData.item]);
                                }
                                else {
                                    setSelectedItems((selectedItem) => selectedItem.filter(item => item !== itemData.item))
                                }
                            }}
                            style={itemData.item.selected ? styles.selectedButton : styles.unselectedButton}
                        >
                            <Text style={{ color: 'white', padding: 10 }}>{itemData.item.lectureName}</Text>
                        </Button>
                    </View>

                )}
            />
            <View style={styles.exportButton}>
                <TouchableOpacity onLongPress={() => { console.log('long press') }}>
                    <Text>Export Attendance</Text>
                </TouchableOpacity>
            </View>
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
    },
    exportButton: {
        alignContent: 'center',
        padding: 10,
        alignItems: 'center'
    },
    selectedButton: {
        backgroundColor: 'green'
    },
    unselectedButton: {

    }
});

export default ViewAllLectureTakenScreen;