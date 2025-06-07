import React, {useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, Alert, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Link} from 'expo-router';
import {images} from '../constants/images';
import {AuthContext} from '../context/authContext';
import {loginUser} from '../services/api';



const Login = ({navigation}) => {
    const {signIn} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const result = await loginUser(email, password);
        if (result.success) {
            signIn(result.token, result.user);
            console.log(result.token);
            navigation.replace("Dashboard");

        } else {
            Alert.alert("Login Failed", result.message);
            console.log(result)
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={images.logoImage} style={styles.logo}/>

                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                    <Text style={styles.subText}>Login to your account</Text>
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Email address"
                            placeholderTextColor="#A8B5DB"
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>

                    <View style={[styles.inputContainer, {marginTop: 24}]}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#A8B5DB"
                            secureTextEntry
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.rememberRow}>
                        <Text style={styles.rememberText}>Remember me</Text>
                        <Text style={styles.rememberText}>Forgot Password</Text>
                    </View>
                </View>

                <View style={styles.actionGroup}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.signupText}>
                        Don't have an account?{'\n '}
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")} >
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingHorizontal: 18,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 39,
        resizeMode: 'contain',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        color: '#4CAF50',
    },
    subText: {
        marginTop: 8,
        fontFamily: 'Inter',
        color: '#6E6E6E',
    },
    inputGroup: {
        marginTop: 30,
    },
    inputContainer: {
        paddingLeft: 15,
        backgroundColor: '#E9F5EA', // assuming greenL
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
    },
    input: {
        color: '#000',
        fontFamily: 'Inter',
    },
    rememberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    rememberText: {
        fontSize: 13,
        color: '#817E7E',
        fontFamily: 'Inter',
    },
    actionGroup: {
        marginTop: 60,
        paddingHorizontal: 2,
    },
    loadingWrapper: {
        alignItems: 'center',
    },
    loginButton: {
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter',
    },
    signupText: {
        textAlign: 'center',
        marginTop: 12,
        fontFamily: 'Inter',
    },
    signupLink: {
        color: '#4CAF50',
    },
});