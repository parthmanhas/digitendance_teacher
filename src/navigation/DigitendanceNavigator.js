import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import QRCodeGeneratedScreen from '../screens/QRCodeGeneratedScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import TeacherProfileScreen from '../screens/TeacherProfileScreen';
import ViewAttendanceByDateScreen from '../screens/ViewAttendanceByDateScreen';
import ViewAttendanceByLectureScreen from '../screens/ViewAttendanceByLectureScreen';
import ViewAttendanceByStudentsScreen from '../screens/ViewAttendanceByStudentsScreen';

const RootNavigator = createStackNavigator({

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Teacher: {
        screen: TeacherProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Event: {
        screen: CreateEventScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ViewAttendanceByDate: {
        screen: ViewAttendanceByDateScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    QRCodeGenerated: {
        screen: QRCodeGeneratedScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ViewAttendanceByLecture: {
        screen: ViewAttendanceByLectureScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ViewAttendanceByStudents: {
        screen: ViewAttendanceByStudentsScreen,
        navigationOptions: {
            headerShown: false
        }
    },

});

const styles = StyleSheet.create({});

export default createAppContainer(RootNavigator);