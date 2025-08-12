import {Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect, useState, useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {icons} from "../../constants/icons";
import {getSensorData} from "../../services/api";


export const FarmDetails = () => {
    const route = useRoute();
    const {id, name, location, crop, temperature, moisture, size, esp32Id} = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({title: name}); // Set the header title dynamically
    }, [route]);


    // const [irrigationOn, setIrrigationOn] = useState(false);x

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.editButton} onPress={()=> navigation.navigate("Edit Farm", {id, name, location, crop, size })} >
                    <Image source={icons.edit} style={styles.editIcon} />
                    <Text style={styles.editText}> Edit</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.switchWrapper} onPress={() => navigation.navigate("Irrigation Control", {id, esp32Id})}>
                <Text style={styles.switchLabel}>Irrigation Control</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Farm Information</Text>
                <Text>Farm Size: {size}</Text>
                <Text>Location: {location}</Text>
                <Text>Soil type: Loam</Text>
                <Text>Crop type: {crop}</Text>
            </View>

            <View style={[styles.card, styles.moistureCard]}>
                <Text style={styles.sensorTitle}>Moisture Sensor</Text>
                <Text style={styles.sensorMeta}>Last Update: </Text>
                <Text style={styles.sensorMeta}>Threshold Range: </Text>
                <Text style={styles.sensorValue}>{moisture}%</Text>
            </View>

            <View style={[styles.card, styles.tempCard]}>
                <Text style={styles.sensorTitle}>Temperature Sensor</Text>
                <Text style={styles.sensorMeta}>Last Update: </Text>
                <Text style={styles.sensorMeta}>Threshold Range: </Text>
                <Text style={styles.sensorValue}> {temperature}°</Text>
            </View>

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    logoText: {
        textAlign: 'center',
        color: '#4CAF50',
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Nunito-Bold',
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'left',
        justifyContent: 'space-between',

    },
    back: {
        fontSize: 24,
    },
    farmName: {
        fontSize: 20,
        fontWeight: '600',
    },
    editButton: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    editText: {
        color: '#4CAF50',
    },
    dateText: {
        marginVertical: 8,
        color: '#999',
    },
    switchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EAF2F2',
        padding: 12,
        borderRadius: 10,
        marginVertical: 12,
        height:50
    },
    switchLabel: {
        fontWeight:"bold",
        fontSize: 16,
        color: '#126E82',
        fontFamily: 'Nunito-Medium',
    },
    section: {
        marginVertical: 10,
    },
    sectionHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'Nunito-Variable',
    },
    card: {
        borderRadius: 10,
        padding: 16,
        marginTop: 16,
    },
    moistureCard: {
        borderColor: '#4CAF50',
        borderWidth: 1,
    },
    tempCard: {
        borderColor: '#f44336',
        borderWidth: 1,
    },
    sensorTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    sensorMeta: {
        color: '#555',
        fontSize: 13,
    },
    sensorValue: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'right',
    },
    bottomTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 18,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 24,
    },
    tab: {
        fontSize: 18,
        color: '#4CAF50',
    },
    tabActive: {
        fontSize: 18,
        color: '#4CAF50',
        backgroundColor: '#E9F5EA',
        padding: 6,
        borderRadius: 8,
    },
    editIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: '#4CAF50',
        marginLeft: 12
    },
});
