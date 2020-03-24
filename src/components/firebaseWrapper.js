import { Alert } from 'react-native';
import * as firebase from 'firebase';
import store from '../store/store';

const BASE_PATH = '';

export function Login(email, password, props, setShowActivityIndicator) {
    email = 'teacher2@gmail.com';
    password = 'teacher2';
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            props.navigation.navigate('Teacher', { email: email });
            setShowActivityIndicator(false);
        })
        .catch(error => {
            Alert.alert(error.message);
            setShowActivityIndicator(false);
        });
}

export function SignUp(email, password, setShowActivityIndicator) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            Alert.alert("Sign Up Successful! Please Login in!");
            setShowActivityIndicator(false);
        })
        .catch((error) => {
            Alert.alert(error.message);
            setShowActivityIndicator(false);
        })
}

export function AddEvent(eventName, eventDate, eventSecret, eventTime, expiryTime) {
    const db = firebase.database();
    let currentUserEmail = firebase.auth().currentUser.email.split('@')[0];
    const path = BASE_PATH + `${currentUserEmail}/${eventDate}/${eventName}`;
    const latitude = store.getState().location.latitude;
    const longitude = store.getState().location.longitude;
    const accuracy = store.getState().location.accuracy;
    db.ref(path).set({
        eventInformation: {
            secret: eventSecret,
            time: eventTime,
            coords: {
                latitude: latitude,
                longitude: longitude,
                accuracy: accuracy
            },
            expiryTime: expiryTime
        }
    });
    db.ref(path + '/attendance').set({ init: 1 });


    return currentUserEmail;
}

export function ViewAttendanceByDate(username, setData, setDataLoaded) {
    const path = BASE_PATH + username;
    firebase.database().ref(path).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        })
        .catch((error) => Alert.alert(error.message));
}

export function ViewAttendanceByLecture(username, selectedDate, setData, setDataLoaded) {
    const path = BASE_PATH + `${username}/${selectedDate}`;
    firebase.database().ref(path).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        })
        .catch((error) => Alert.alert(error.message));
}

export function ViewAttendanceByStudent(username, setData, date, lecture, setDataLoaded) {
    const path = BASE_PATH + `${username}/${date}/${lecture}/attendance`;
    firebase.database().ref(path).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        })
        .catch((error) => {
            Alert.alert(error.message);
        })
}



