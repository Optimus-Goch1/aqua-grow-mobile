import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../constants/images';
import { wp } from '../utils/dimensions';

const WelcomeCard = ({ text, bgColor, textColor, actions }) => (
    <TouchableOpacity>
        <View style={[styles.card, { backgroundColor: bgColor, width: wp(79) }]}>
            <Pressable onPress={actions}>
                <Text style={[styles.cardText, { color: textColor }]}>{text}</Text>
            </Pressable>
        </View>
    </TouchableOpacity>
);

const Welcome = () => {
    const navigation = useNavigation();


    const handleLogin = () => navigation.navigate('Login');
    const handleSignUp = () => navigation.navigate('Signup');

    return (
        <SafeAreaView>
            <View style={styles.logoContainer}>
                <Image source={images.logoImage} style={styles.logoImage} />
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Best App for</Text>
                <Text style={styles.titleText}>Smarter Farming</Text>
            </View>

            <View style={styles.buttonGroup}>
                <WelcomeCard text='Login' bgColor='#4CAF5033' actions={handleLogin} textColor='#4CAF50' />
                <WelcomeCard text='Create an account' bgColor='#4CAF50' actions={handleSignUp} textColor='#FFFFFF' />
            </View>
        </SafeAreaView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    logoImage: {
        height: 150,
        resizeMode: 'contain',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 43,
    },
    titleText: {
        fontSize: 40,
        fontFamily: 'Nunito-Semi',
        color: '#4CAF50',
        textAlign: 'center',
        marginHorizontal: wp(5.1),
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        fontWeight: '800',
    },
    buttonGroup: {
        marginTop: 96,
        alignItems: 'center',
        rowGap: 24,
        marginHorizontal: wp(11.6),
    },
    card: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 20,
        fontFamily: 'Inter',
    },
});