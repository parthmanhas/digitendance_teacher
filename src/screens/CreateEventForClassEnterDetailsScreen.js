import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Modal } from 'react-native';
import { Button } from 'native-base';
import *  as colors from '../constants/colors';
import store from '../store/store';
import * as firebaseWrapper from '../components/firebaseWrapper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CreateEventScreen = props => {

    const [data, setData] = useState();
    const [classNames, setClassNames] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const enterClassDetailsModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleUploadCSV = () => {
        
    }

    useEffect(() => {
        if (!dataLoaded) {
            setData(firebaseWrapper.getAllClass(setData, setDataLoaded));
        }

        else if (classNames.length === 0) {

            let temp = [];
            let j = 0;
            for (var i in data) {
                if (i !== 'init')
                    temp.push({ key: `${j}`, name: i });
                j++;
            }
            setClassNames(temp);
        }
    }, [dataLoaded, data])

    return (
        <View style={styles.screen}>
            <View style={styles.heading}>
                <Text style={{ fontSize: 23 }}>Select a Class</Text>
            </View>

            {/* <Button title="Set class details" onPress={setClass} />
            <Button title="console log" onPress={print} /> */}

            <ActivityIndicator animating={!dataLoaded} />
            <FlatList
                data={classNames}
                renderItem={(itemData, index) => (
                    <View style={styles.listItem}>
                        <Button
                            full
                            rounded
                        >
                            <Text style={{ color: 'white', padding: 30, fontSize: 18 }}>{itemData.item.name}</Text>
                        </Button>
                    </View>
                )}
            />

            <Button
                full
                rounded
                onPress={enterClassDetailsModal}
            >
                <Text style={{ color: 'white', padding: 10, fontSize: 18 }}>Add New Class</Text>
            </Button>
            <Modal visible={showModal} animationType="fade" style={styles.modal}>
                <View style={styles.center}>
                    <Button
                        full
                        onPress={handleUploadCSV}
                    >
                        <Text style={{ padding: 19, color: 'white' }}>Upload CSV</Text>
                    </Button>
                </View>
                <View style={styles.bottom}>
                    <Button
                        full
                        onPress={closeModal}
                    >
                        <Text style={{ padding: 19, color: 'white' }}>Close</Text>
                    </Button>
                </View>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND
    },
    heading: {
        alignContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        flex: 1,
        margin: 5
    },
    modal: {
        flex: 1,
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 36
    },
    center: {
        flex: 1,
        justifyContent: 'space-evenly',
        margin: 36
    }
})

export default CreateEventScreen;

