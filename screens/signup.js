import React, {useContext, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../constants/images';
import {Link, useRouter} from 'expo-router';
import {AuthContext} from '../context/authContext';
// import Loading from '../components/Loading';
import {signupUser} from '../services/api'; // Call Flask backend

const Signup = ({navigation}) => {
    const router = useRouter();
    const {signIn} = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Sign Up', 'Please fill all the fields');
            return;
        }

        setLoading(true);
        try {
            const response = await signupUser(name, email, password);
            setLoading(false);

            if (response.success) {
                signIn(response.token, response.user); // update context
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                Alert.alert('Sign Up Failed', response.message || 'Try again');
            }
        } catch (err) {
            setLoading(false);
            Alert.alert('Error', err.message || 'Something went wrong');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Image source={images.logoImage} style={styles.logo}/>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.subtitle}>Create your new account</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Name"
                            onChangeText={setName}
                            placeholderTextColor="#A8B5DB"
                            style={styles.input}
                        />
                    </View>

                    <View style={[styles.inputContainer, {marginTop: 24}]}>
                        <TextInput
                            placeholder="Email address"
                            onChangeText={setEmail}
                            placeholderTextColor="#A8B5DB"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.inputContainer, {marginTop: 24}]}>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={setPassword}
                            placeholderTextColor="#A8B5DB"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.rememberBox}>
                        <Text style={styles.rememberText}>Remember me</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={styles.footer}>
                        Already have an account?{' '}
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Signup;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 39,
        resizeMode: 'contain',
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 18,
    },
    header: {
        alignItems: 'center',
        marginHorizontal: 14.5,
    },
    title: {
        fontSize: 24,
        color: '#4CAF50',
        fontFamily: 'Nunito',
    },
    subtitle: {
        marginTop: 8,
        color: '#6E6E6E',
        fontFamily: 'Nunito-Medium',
    },
    form: {
        marginTop: 30,
    },
    inputContainer: {
        backgroundColor: '#E9F5EA', // assumed greenL
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    input: {
        color: '#000',
        fontFamily: 'Nunito-Medium',
    },
    rememberBox: {
        marginTop: 15,
        justifyContent: 'center',
    },
    rememberText: {
        fontSize: 13,
        fontFamily: 'Nunito-Medium',
    },
    actions: {
        marginTop: 30,
    },
    loadingWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupButton: {
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Nunito-Medium',
    },
    footer: {
        marginTop: 12,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Nunito-Medium',
    },
    link: {
        color: '#4CAF50',
    },
});