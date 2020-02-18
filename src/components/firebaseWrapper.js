import { Alert } from 'react-native';
import * as firebase from 'firebase';
import store from '../store/store';

export function Login(email, password, props, setShowActivityIndicator) {
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

export function SignUp(email, password, props, setShowActivityIndicator) {
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

export function AddEvent(eventName, eventDate, eventSecret, eventTime) {
    const db = firebase.database();
    let currentUserEmail = firebase.auth().currentUser.email.split('@')[0];
    const path = `${currentUserEmail}/${eventDate}/${eventName}`;
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
            }
        }
    });
    db.ref(path + '/attendance').set({ init: 1 });


    return currentUserEmail;
}

export function ViewAttendanceByDate(username, setDataLoaded) {
    firebase.database().ref(username).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        })
        .catch((error) => Alert.alert(error.message));
}

export function ViewAttendanceByLecture(username, selectedDate, setData, setDataLoaded) {
    firebase.database().ref(`${username}/${selectedDate}`).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        })
        .catch((error) => Alert.alert(error.message));
}

export function ViewAttendanceByStudent(username, date, lecture, setDataLoaded) {
    firebase.database().ref(`${username}/${date}/${lecture}/attendance`).once('value')
        .then((snap) => {
            setData(snap.val());
            setDataLoaded(true);
        })
        .catch((error) => {
            Alert.alert(error.message);
        })
}


