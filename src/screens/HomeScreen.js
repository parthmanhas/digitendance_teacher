import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';

const HomeScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (email, password) => {
        //add email validation
        //dislay error when validation goes wrong
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                props.navigation.navigate('Event');
                console.log(firebase.auth().currentUser)
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    }

    const signUpUser = (email, password) => {
        //display error when something goes wrong
        try {
            if (password.length < 6) {
                Alert.alert("Please enter more than 6 characters");
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(email, password).then(
                Alert.alert('Sign up successful! Please Login!')
            );
        }
        catch (error) {
            console.log(error.toString());
        }
    }

    return (
        // <View style={styles.screen}>
        //     <Text>WELCOME TO DIGITENDANCE!</Text>
        //     <Button title="Create Event" onPress={() => {
        //         props.navigation.navigate('Event')
        //     }} />
        // </View>

        <Container style={styles.screen}>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input

                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Item>
                <Button
                    full
                    rounded
                    success
                    onPress={() => loginUser(email, password)}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </Button>


                <Button
                    onPress={() => signUpUser(email, password)}
                    style={{ marginTop: 10 }}
                    full
                    rounded
                    primary
                >
                    <Text style={{ color: 'white' }}>Sign Up</Text>
                </Button>
            </Form>
        </Container>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    }
});

export default HomeScreen;