import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebaseWrapper from '../components/firebaseWrapper';

const HomeScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const loginUser = (email, password) => {
        setShowActivityIndicator(true);
        //add email validation
        //dislay error when validation goes wrong

        //$TODO REMOVE THESE TWO LINES BELOW
        setEmail('teacher2@gmail.com');
        setPassword('teacher2');
        firebaseWrapper.Login(email, password, props,setShowActivityIndicator);

        
    }

    const signUpUser = (email, password) => {
        //display error when something goes wrong
        setShowActivityIndicator(true);
        try {
            if (password.length < 6) {
                Alert.alert("Please enter more than 6 characters");
                setShowActivityIndicator(false);
                return;
            }
            firebaseWrapper.SignUp(email, password, props, setShowActivityIndicator);
            
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
                <ActivityIndicator style={{margin: 10}}animating={showActivityIndicator} />
                <Button
                    full
                    rounded
                    success
                    onPress={() => loginUser(email, password)}
                    disabled = {showActivityIndicator}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </Button>


                <Button
                    onPress={() => signUpUser(email, password)}
                    style={{ marginTop: 10 }}
                    full
                    rounded
                    primary
                    disabled = {showActivityIndicator}
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