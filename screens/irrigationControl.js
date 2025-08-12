import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toggle from "../utils/toggle";
import {getThreshold, toggleIrrigation, updateThreshold} from "../services/api";
import {AuthContext} from '../context/authContext';
import {useNavigation, useRoute} from '@react-navigation/native';

const IrrigationControl = () => {
    const navigation = useNavigation();

    const {token} = useContext(AuthContext);
    const {params} = useRoute();
    const {id: farmId, esp32Id: esp32Id} = params; // Make sure `id` is passed from navigation
    const [manualSwitch, setManualSwitch] = useState(false);


    const [moistureOnTrigger, setMoistureOnTrigger] = useState('');
    const [moistureOffTrigger, setMoistureOffTrigger] = useState('');

    const [temperatureOnTrigger, setTemperatureOnTrigger] = useState('');
    const [temperatureOffTrigger, setTemperatureOffTrigger] = useState('');

    useEffect(() => {
        const fetchThresholds = async () => {
            try {
                const result = await getThreshold(esp32Id); // GET /farms/threshold/:farmId
                if (result.success) {
                    setMoistureOnTrigger(result.data.moisture_lower_threshold?.toString() || '');
                    setMoistureOffTrigger(result.data.moisture_upper_threshold?.toString() || '');
                    setTemperatureOnTrigger(result.data.temperature_upper_threshold?.toString() || '');
                    setTemperatureOffTrigger(result.data.temperature_lower_threshold?.toString() || '');
                } else {
                    Alert.alert("Error", result.message || "Failed to fetch thresholds");
                }
            } catch (error) {
                console.error("Error fetching thresholds:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchThresholds();
    }, [esp32Id]);


    const handleToggleIrrigation = async (newStatus) => {
        setManualSwitch(newStatus); // Optimistic UI update

        const result = await toggleIrrigation(token, esp32Id, newStatus);
        console.log(result);

        if (!result.success) {
            alert(result.message);
            setManualSwitch(!newStatus); // revert if failed
        }
    };


    const handleUpdateThresholds = async () => {

        const payload = {
            moisture_upper_threshold: moistureOffTrigger,
            moisture_lower_threshold: moistureOnTrigger,
            temperature_upper_threshold: temperatureOnTrigger,
            temperature_lower_threshold: temperatureOffTrigger,

        };
        const result = await updateThreshold(token, farmId, payload)

        if (result.success) {
            Alert.alert("Success", "Threshold updated successfully");
            navigation.goBack();
        } else {
            Alert.alert("Update Failed", result.message);
        }
    };




    return (
        <ScrollView style={styles.container}>


            <Text style={styles.sectionTitle}>Manual Control Settings</Text>
            <View style={styles.switchRow}>
                <Text style={styles.label}>Irrigation Switch</Text>
                <Toggle
                    value={manualSwitch}
                    onValueChange={(newVal) => handleToggleIrrigation(newVal)}
                />

            </View>


            <Text style={styles.sectionTitle}>Automatic Control Settings</Text>
            <View>
                <Text style={styles.subtext}>Trigger By Moisture Level</Text>

                <Text> Minimum Threshold</Text>
                <TextInput style={styles.input}
                           value={moistureOnTrigger}
                           onChangeText={setMoistureOnTrigger}
                           keyboardType="numeric"
                />

                <Text>Maximum Threshold</Text>
                <TextInput style={styles.input}
                           value={moistureOffTrigger}
                           onChangeText={setMoistureOffTrigger}
                           keyboardType="numeric"
                />
            </View>


            <View>
                <Text style={styles.subtext}>Trigger By Temperature</Text>

                <Text> Maximum Threshold - temperature which turns on the Irrigation</Text>
                <TextInput style={styles.input}

                           selectedValue={temperatureOnTrigger}
                           onValueChange={(val) => setTemperatureOnTrigger(val)}

                />
                <Text> Minimum Threshold - temperature which turns off the Irrigation</Text>
                <TextInput style={styles.input}

                           selectedValue={temperatureOffTrigger}
                           onValueChange={(val) => setTemperatureOffTrigger(val)}

                />
            </View>


            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdateThresholds}>
                    <Text style={styles.buttonText}>Save changes</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },

    switch: {
        size: 60

    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Nunito-Medium',
    },
    subtext: {
        marginVertical: 10,
        color: '#666',
        marginBottom: 10,
    },
    label: {
        marginTop: 10,
        fontWeight: '600',
        color: '#126E82',
        fontSize: 18,
        fontFamily: 'Nunito-Medium',

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginTop: 5,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#f2f2f2',
        marginTop: 5,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelButton: {
        borderColor: '#4CAF50',
        borderWidth: 1,
        padding: 14,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Nunito-Medium',
    },
    cancelText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontFamily: 'Nunito-Medium',

    },
});

export default IrrigationControl;
