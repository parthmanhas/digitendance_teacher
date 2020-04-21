import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import DisplayStandAloneEventQRCodeScreen from '../screens/DisplayStandAloneEventQRCodeScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import TeacherProfileScreen from '../screens/TeacherProfileScreen';
import ViewAttendanceByDateScreen from '../screens/ViewAttendanceByDateScreen';
import ViewAttendanceByLectureScreen from '../screens/ViewAttendanceByLectureScreen';
import ViewAttendanceByStudentsScreen from '../screens/ViewAttendanceByStudentsScreen';
import ExportAttendanceScreen from '../screens/ExportAttendanceScreen';
import AllEventsTakenScreen from '../screens/AllEventsTakenScreen';
import ViewAllLecturesTakenScreen from '../screens/ViewAllLecturesTakenScreen';
import ViewAllQuizTakenScreen from '../screens/ViewAllQuizTakenScreen';
import ViewAllTestTakenScreen from '../screens/ViewAllTestTakenScreen';
import ViewAllWorkshopTakenScreen from '../screens/ViewAllWorkshopTakenScreen';
import CreateEventStandAloneEnterDetailsScreen from '../screens/CreateEventStandAloneEnterDetailsScreen';
import CreateEventForClassEnterDetailsScreen from '../screens/CreateEventForClassEnterDetailsScreen';
import DisplayClassEventQRCodeScreen from '../screens/DisplayClassEventQRCodeScreen';

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
    CreateStandAloneEvent: {
        screen: CreateEventStandAloneEnterDetailsScreen,
    },
    CreateClassEvent: {
        screen: CreateEventForClassEnterDetailsScreen,
    },
    ViewAttendanceByDate: {
        screen: ViewAttendanceByDateScreen,
    },
    QRCodeGenerated: {
        screen: DisplayStandAloneEventQRCodeScreen,
    },
    ViewAttendanceByLecture: {
        screen: ViewAttendanceByLectureScreen,
    },
    ViewAttendanceByStudents: {
        screen: ViewAttendanceByStudentsScreen,
    },
    ExportAttendance: {
        screen: ExportAttendanceScreen,
    },
    AllEventsTaken: {
        screen: AllEventsTakenScreen,
    },
    AllLecturesTaken: {
        screen: ViewAllLecturesTakenScreen,
    },
    AllTestTaken: {
        screen: ViewAllTestTakenScreen,
    },
    AllQuizTaken: {
        screen: ViewAllQuizTakenScreen,
    },
    AllWorkshopTaken: {
        screen: ViewAllWorkshopTakenScreen,
    },
    DisplayClassEventQRCodeScreen: {
        screen: DisplayClassEventQRCodeScreen,
    }

}, {
    defaultNavigationOptions: {
        headerShown: false,
    }
});

const styles = StyleSheet.create({});

export default createAppContainer(RootNavigator);