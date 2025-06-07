import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle, Rect} from 'react-native-svg';


export const Dial = ({ color, fill, text }) => {

    const getUnit = () => {
        if (text?.toLowerCase() === "moisture") return "%";
        if (text?.toLowerCase() === "temperature") return "°";
        return "";
    };

    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={80}
                width={7}
                fill={fill}
                rotation={225}
                lineCap="square"
                tintColor={color}
                backgroundColor="#3d5875"
                padding={10}
                renderCap={({ center }) => (
                    <Circle cx={center.x} cy={center.y} r="5" fill={color} />
                )}
                arcSweepAngle={270}

            />
            <View style={styles.centerText}>
                <Text style={styles.fillText}>
                    {fill}
                    {getUnit()}
                </Text>
            </View>
            <Text style={styles.label}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'relative',
        width: 90,
        height: 100,
    },
    centerText: {
        position: 'absolute',
        top: 35, // adjust based on visual balance
        left: 5,
        right: 0,
        alignItems: 'center',
    },
    fillText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    label: {
        marginTop: -20,
    },
});
