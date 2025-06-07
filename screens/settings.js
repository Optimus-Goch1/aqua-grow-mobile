import React, {useContext} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants/images';
import { wp, hp } from '../utils/dimensions';
import {AuthContext} from '../context/authContext';
import {Notifications} from "./notifications";
import {useNavigation} from "@react-navigation/native";
import Welcome from "./welcome";

// Reusable settings item
const SettingsCard = ({ img, title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
            <Image source={img} style={styles.icon} />
            <Text style={styles.cardText}>{title}</Text>
        </View>
    </TouchableOpacity>
);

export const Settings = ({}) => {
    const { signOut } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleSignOut = async () => {

        await signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Image source={images.logoImage} style={styles.logo} />
            <View style={styles.cardList}>
                <SettingsCard img={images.accountSetting} title="Account Settings" />
                <SettingsCard img={images.notificationsImage} title="Notifications" onPress={() => navigation.navigate('Notifications')} />
                <SettingsCard img={images.security} title="Privacy Terms" />
                <SettingsCard img={images.informationCircle} title="About Us" />
                <SettingsCard img={images.logOut} title="Logout" onPress={handleSignOut} />
            </View>
        </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 80,
        height: 72,
        resizeMode: 'contain',
        marginLeft: wp(39),
    },
    cardList: {
        marginTop: 23,
        alignSelf: 'center',
        width: wp(88),
        flexDirection: 'column',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(7.1),
        marginBottom: 10,
        gap: 8, // if supported by your RN version
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    cardText: {
        fontSize: 16,
        fontFamily: 'Inter',
    },
});