import React from 'react';
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

    Home: HomeScreen,
    Teacher: TeacherProfileScreen,
    Event: CreateEventScreen,
    ViewAttendanceByDate: ViewAttendanceByDateScreen,
    QRCodeGenerated: QRCodeGeneratedScreen,
    ViewAttendanceByLecture: ViewAttendanceByLectureScreen,
    ViewAttendanceByStudents: ViewAttendanceByStudentsScreen,

});

const styles = StyleSheet.create({});

export default createAppContainer(RootNavigator);