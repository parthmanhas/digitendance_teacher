import { Alert } from 'react-native';
import * as firebase from 'firebase';
import store from '../store/store';
import { setUsername } from '../store/actions/username';

const BASE_PATH = '';

export function Login(email, password, props, setShowActivityIndicator) {
    // email = 'teacher2@gmail.com';
    // password = 'teacher2';

    //set username in store so it is available globally

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            const username = email.split('@')[0];
            store.dispatch(setUsername(username));
            // console.log(store.getState());
            setShowActivityIndicator(false);
            props.navigation.navigate('Teacher');
        })
        .catch(error => {
            Alert.alert(error.message);
            setShowActivityIndicator(false);
        });
}

export function SignUp(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim())
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export function AddEvent(qrCode = '') {
    return new Promise((resolve, reject) => {
        const e = store.getState().eventDetails;
        const eventName = e.eventName;
        const eventDate = e.eventDate;
        const eventSecret = e.eventSecret;
        const eventTime = e.eventTime;
        const expiryTime = e.expiryTime;
        const eventType = e.eventType;


        const db = firebase.database();
        let currentUserEmail = firebase.auth().currentUser.email.split('@')[0];
        const path = `${currentUserEmail}/${eventType}/${eventDate}/${eventName}`;
        const datePath = `${currentUserEmail}/allDates`;
        const classPath = `${currentUserEmail}/allClasses`;

        // addEvent in seperate key 
        const allLecturesTakenPath = `${currentUserEmail}/allEventTaken/allLecturesTaken`;
        const allQuizTakenPath = `${currentUserEmail}/allEventTaken/allQuizTaken`;
        const allTestTakenPath = `${currentUserEmail}/allEventTaken/allTestTaken`;
        const allWorkshopTakenPath = `${currentUserEmail}/allEventTaken/allWorkshopTaken`;

        //add date in date root key
        db.ref(datePath).child(eventDate).set(1);

        //add initialise class path
        db.ref(classPath).update({ 'init': '1' });

        // console.log('eventType ' + eventType);
        switch (eventType) {
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
        }).then(() => {
            return db.ref(path + '/attendance').set({ init: 1 });
        })
            .then(() => {
                if (qrCode !== '')
                    return db.ref(path + '/qrCode').set({ 'qrCode': qrCode });
            })
            .then(() => resolve())
            .catch(err => reject(err));
    })
}


export function ViewAttendanceByDate(username, data, setDataLoaded) {

    return new Promise((resolve, reject) => {
        const path = BASE_PATH + username;
        firebase.database().ref(path).once('value')
            .then((snap) => {
                data = snap.val();
                setDataLoaded(true);
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export function ViewAttendanceBySubEvent(subEvent, setDataLoaded) {
    return new Promise((resolve, reject) => {
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = BASE_PATH + `${username}/${subEvent}`;

        firebase.database().ref(path).once('value')
            .then((snap) => {
                setDataLoaded(true);
                resolve(snap.val());
            })
            .catch((error) => {
                reject(error)
            });
    })
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

export function ViewAllLecturesTaken(setGetData, setDataLoaded) {
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

export function ViewAllQuizTaken(setGetData, setDataLoaded) {
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

export function ViewAllTestTaken(setGetData, setDataLoaded) {
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

export function ViewAllWorkshopTaken(setGetData, setDataLoaded) {
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

export function getAllClass() {
    return new Promise((resolve, reject) => {
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = `${username}/allClasses`;

        firebase.database().ref(path).once('value')
            .then(snap => {
                // store.dispatch(setClassDetails(snap.val())); DELETE THIS REDUCER NO NEED
                resolve(snap.val());
            })
            .catch(err => {
                reject(err);
            })
    })
}


export function addClass(data) {
    return new Promise((resolve, reject) => {
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = `${username}/allClasses`;

        const db = firebase.database();
        db.ref(path).update(data)
            .then(() => resolve('Success'))
            .catch((err) => reject(err));
    })
}

export function getClassData(className) {
    return new Promise((resolve, reject) => {
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = `${username}/allClasses/${className}`;

        console.log(path);

        const db = firebase.database();

        db.ref(path).once('value')
            .then(snap => {
                resolve(snap.val());
            })
            .catch(err => {
                reject(err);
            });
    })
}

export function updateClass(className, data) {
    return new Promise((resolve, reject) => {
        const e = store.getState().eventDetails;
        const eventName = e.eventName;
        const eventDate = e.eventDate;
        const eventType = e.eventType;
        let username = firebase.auth().currentUser.email.split('@')[0];
        const path = `${username}/${eventType}/${eventDate}/${eventName}/attendance`;
        const db = firebase.database();

        db.ref(path).update(data)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    })
}