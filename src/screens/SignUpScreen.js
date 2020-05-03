import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, YellowBox, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Spinner, Card, CardItem, Body } from 'native-base'
import * as firebaseWrapper from '../components/firebaseWrapper';

const SignUpScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const signUpUser = (email, password) => {
        // display error when something goes wrong
        setDisableButton(true);
        setShowActivityIndicator(true);

        if (password.length < 6) {
            Alert.alert("Please enter more than 5 characters password");
            setDisableButton(false);
            setShowActivityIndicator(false);
            return;
        }

        firebaseWrapper.SignUp(email, password)
            .then(() => {
                setDisableButton(false);
                setShowActivityIndicator(false);
                Alert.alert('Success', 'Sign Up Successful, Please Login')
                props.navigation.pop();
            })
            .catch(err => {
                Alert.alert('Error', err.message);
                setShowActivityIndicator(false);
                setDisableButton(false);
            })

    }

    const handleEmailInput = email => {
        setEmail(email);
    }

    const handlePasswordInput = password => {
        setPassword(password);
    }

    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem header>
                        <Text style={styles.cardHeader}>Create Account</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    keyboardType="email-address"
                                    onChangeText={handleEmailInput}
                                    value={email}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={handlePasswordInput}
                                    value={password}
                                />
                            </Item>
                            <View style={styles.loadingSign}>
                                <ActivityIndicator animating={showActivityIndicator} />
                            </View>
                            <Button
                                onPress={() => signUpUser(email, password)}
                                style={showActivityIndicator ? { borderRadius: 6, marginTop: 10, backgroundColor: '#bdbdbd' } : { borderRadius: 6, marginTop: 10, backgroundColor: '#4db6ac' }}
                                full
                                primary
                                disabled={disableButton}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        fontSize: 20,
        fontWeight: "bold",
    },
    loadingSign: {
        flex: 1,
        paddingTop: 10,
        width: '100%',
    }
});

export default SignUpScreen;