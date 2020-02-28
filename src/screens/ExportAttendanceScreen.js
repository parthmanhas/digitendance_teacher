import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import * as firebaseWrapper from '../components/firebaseWrapper';

const ExportAttendanceScreen = props => {

    const username = props.navigation.getParam('username', undefined);

    const [data, setData] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dates, setDates] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);

    dates.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    })

    const exportAttendance = () => {
        //get data from each dates
        //combine data into one excel sheet
        
    }

    useEffect(() => {
        if (!dataLoaded) {
            firebaseWrapper.ViewAttendanceByDate(username, setData, setDataLoaded);
        }
        else if (dates.length == 0) {
            let j = 0;
            let getDates = []
            for (var i in data) {

                getDates.push({ key: `${j}`, date: i, selected: false });
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
                            
                            style={itemData.item.selected ? styles.selected : styles.unselected}
                            onPress={() => {
                                itemData.item.selected = !itemData.item.selected;
                                if(itemData.item.selected){
                                    setSelectedItem((selectedItem) => [...selectedItem, itemData.item]);
                                }
                                else{
                                    setSelectedItem((selectedItem) => selectedItem.filter(item => item !== itemData.item))
                                }
                                console.log(selectedItem);
                            }}
                        >
                            <Text style={{ color: 'white', padding: 10 }}>{itemData.item.date}</Text>
                        </Button>
                    </View>

                )}

            />
            <Button
                full
                onPress={exportAttendance}
            >
                <Text style={{ color: 'white' }}>Export to Excel Format</Text>
            </Button>
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
    },
    selected:{
        backgroundColor: 'green'
    },
    unselected:{

    }
});

export default ExportAttendanceScreen;