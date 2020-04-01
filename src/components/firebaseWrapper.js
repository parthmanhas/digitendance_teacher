import { Alert } from 'react-native';
import * as firebase from 'firebase';
import store from '../store/store';

const BASE_PATH = '';

export function Login(email, password, props, setShowActivityIndicator) {
    email = 'teacher2@gmail.com';
    password = 'teacher2';

    //set username in store so it is available globally

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

export function AddEvent(eventName, eventDate, eventSecret, eventTime, expiryTime, eventType) {
    const db = firebase.database();
    let currentUserEmail = firebase.auth().currentUser.email.split('@')[0];
    const path = BASE_PATH + `${currentUserEmail}/${eventType}/${eventDate}/${eventName}`;


    // addEvent in seperate key 
    const allEventsTakenTillNowCollectionPath = BASE_PATH + `/${currentUserEmail}/allEventTaken`;
    const allLecturesTakenPath = allEventsTakenTillNowCollectionPath + '/allLecturesTaken';
    const allQuizTakenPath = allEventsTakenTillNowCollectionPath + '/allQuizTaken';
    const allTestTakenPath = allEventsTakenTillNowCollectionPath + '/allTestTaken';
    const allWorkshopTakenPath = allEventsTakenTillNowCollectionPath + '/allWorkshopTaken';

    console.log('eventType ' + eventType);
    switch(eventType){
        case 'lecture':
            db.ref(allLecturesTakenPath).child(eventName).set(1);
            break;
        case 'quiz':
            db.ref(allQuizTakenPath).child(eventName).set(1);
            break;
        case 'test':
            db.ref(allTestTakenPath).child(eventName).set(1);
            break;
        case 'workshop':
            db.ref(allWorkshopTakenPath).child(eventName).set(1);
            break;
        default:
            Alert.alert('An error occured. firebaseWrapper -> AddEvent -> switch(eventType)');
    }

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

export function ViewAllLecturesTaken(setGetData, setDataLoaded){
    let username = store.getState().username.username;
    const path = `${username}/allEventTaken/allLecturesTaken`;
    firebase.database().ref(path).once('value')
        .then(snap => {
            setGetData(snap.val());
            setDataLoaded(true);
        })
        .catch(err => {
            Alert.alert(err.message);
        })
}

export function ViewAllQuizTaken(setGetData, setDataLoaded){
    const username = store.getState().username.username;
    const path = `${username}/allEventTaken/allQuizTaken`;

    firebase.database().ref(path).once('value')
        .then(snap => {
            setGetData(snap.val());
            setDataLoaded(true);
        })
        .catch(err => {
            Alert.alert(err.message);
        })
}

export function ViewAllTestTaken(setGetData, setDataLoaded){
    const username = store.getState().username.username;
    const path = `${username}/allEventTaken/allTestTaken`;

    firebase.database().ref(path).once('value')
        .then(snap => {
            setGetData(snap.val());
            setDataLoaded(true);
        })
        .catch(err => {
            Alert.alert(err.message);
        })
}

export function ViewAllWorkshopTaken(setGetData, setDataLoaded){
    const username = store.getState().username.username;
    const path = `${username}/allEventTaken/allWorkshopTaken`;

    firebase.database().ref(path).once('value')
        .then(snap => {
            setGetData(snap.val());
            setDataLoaded(true);
        })
        .catch(err => {
            Alert.alert(err.message);
        })
}
