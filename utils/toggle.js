import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const IrrigationToggle = ({ value, onValueChange }) => {
    const translateX = useRef(new Animated.Value(value ? 30 : 0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 30 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const toggleSwitch = () => {
        onValueChange?.(!value);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.container, value ? styles.onBackground : styles.offBackground]}
            onPress={toggleSwitch}
        >
            <Animated.View style={[styles.knob, { transform: [{ translateX }] }]} />
            <Text style={[styles.label, value ? styles.onText : styles.offText]}>
                {value ? 'On' : 'Off'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 36,
        borderRadius: 50,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    onBackground: {
        backgroundColor: '#4CAF50',
    },
    offBackground: {
        backgroundColor: '#999',
    },
    knob: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    label: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        zIndex: 0,
    },
    onText: {
        color: '#fff',
        marginLeft: 28,
    },
    offText: {
        color: '#fff',
        marginRight: 28,
    },
});

export default IrrigationToggle;