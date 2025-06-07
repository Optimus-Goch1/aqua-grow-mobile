import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../constants/icons'; // Assuming your "+" icon is in icons.add

export const AddFarmCard = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CreateFarm")}>
            <View style={styles.inner}>
                <View style={styles.circle}>
                    <Image source={icons.add} style={styles.icon}/>
                </View>
                <Text style={styles.text}>Add a New Farm</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: '#4CAF50',
        borderWidth: 1,
        borderRadius: 12,
        width: '45%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    inner: {
        alignItems: 'center',
    },
    circle: {
        backgroundColor: '#d4ede4',
        padding: 15,
        borderRadius: 50,
        marginBottom: 10,
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: '#4CAF50',
        resizeMode: 'contain',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: '#000',
    },
});