import { Alert } from 'react-native';
import * as firebase from 'firebase';


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
    db.ref(path).set({ secret: eventSecret, time: eventTime });
    db.ref(path + '/attendance').set({ init: 1 });


    return currentUserEmail;
}

export function ViewAttendance(params) {

}



