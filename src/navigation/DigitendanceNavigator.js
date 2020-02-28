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
    },
    Teacher: {
        screen: TeacherProfileScreen,
    },
    Event: {
        screen: CreateEventScreen,
    },
    ViewAttendanceByDate: {
        screen: ViewAttendanceByDateScreen,
    },
    QRCodeGenerated: {
        screen: QRCodeGeneratedScreen,
    },
    ViewAttendanceByLecture: {
        screen: ViewAttendanceByLectureScreen,
    },
    ViewAttendanceByStudents: {
        screen: ViewAttendanceByStudentsScreen,
    },

}, {
    defaultNavigationOptions:{
        headerShown: false,
    }
});

const styles = StyleSheet.create({});

export default createAppContainer(RootNavigator);