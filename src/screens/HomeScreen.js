import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebaseWrapper from '../components/firebaseWrapper';
import * as colors from '../constants/colors';


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
        firebaseWrapper.Login(email, password, props, setShowActivityIndicator);


    }

    return (
        <Container style={styles.screen}>
            <View style={styles.logo}>
                <Image source={require('../assets/logo.png')} style={{ width: 150, height: 150 }} />
            </View>
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
                <ActivityIndicator style={{ margin: 10 }} animating={showActivityIndicator} />
                <Button
                    full
                    onPress={() => loginUser(email, password)}
                    disabled={showActivityIndicator}
                    style={showActivityIndicator ? { borderRadius: 6, backgroundColor: '#bdbdbd' } : { borderRadius: 6, backgroundColor: '#00897b' }}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
                </Button>


                <Button
                    onPress={() => props.navigation.navigate('SignUpScreen')}
                    style={showActivityIndicator ? { borderRadius: 6, marginTop: 10, backgroundColor: '#bdbdbd' } : { borderRadius: 6, marginTop: 10, backgroundColor: '#4db6ac' }}
                    full
                    primary
                    disabled={showActivityIndicator}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
                </Button>
            </Form>
        </Container>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND
    },
    logo: {
        alignItems: 'center',
    },
    button: {
        borderRadius: 6,
    }
});

export default HomeScreen;