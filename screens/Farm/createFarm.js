import React, {useContext, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {createFarm} from '../../services/api';
import {AuthContext} from '../../context/authContext';
import {useNavigation} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export const CreateFarm = () => {
    const [farmName, setFarmName] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [unit, setUnit] = useState('');
    const [location, setLocation] = useState('');
    const [soilType, setSoilType] = useState('');
    const [cropType, setCropType] = useState('');
    const [esp32Id, setEsp32Id] = useState('');
    const [temperatureUpper, setTemperatureUpper] = useState('');
    const [temperatureLower, setTemperatureLower] = useState('');
    const [moistureLower, setMoistureLower] = useState('');
    const [moistureUpper, setMoistureUpper] = useState('');
    const insets = useSafeAreaInsets();


    const {token} = useContext(AuthContext);
    const navigation = useNavigation();

    const resetForm = () => {
        setFarmName('');
        setFarmSize('');
        setUnit('');
        setLocation('');
        setSoilType('');
        setCropType('');
        setEsp32Id('');
    };

    const handleSubmit = async () => {
        if (!farmName || !location || !esp32Id) {
            Alert.alert("Validation", "Please fill all required fields.");
            return;
        }


        const payload = {
            farm_name: farmName,
            location: location,
            esp32_id: esp32Id,
            crop_type: cropType,
            soil_type: soilType,
            size: farmSize,
            unit: unit,
            temperature_upper_threshold: temperatureLower,
            temperature_lower_threshold: temperatureUpper,
            moisture_lower_threshold: moistureLower,
            moisture_upper_threshold: moistureUpper,
        };

        const result = await createFarm(token, payload);
        if (result.success) {
            Alert.alert("Success", "Farm added successfully.");
            resetForm();
            navigation.navigate("DashboardHome");
        } else {
            Alert.alert("Error", result.message);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
        >
                <Text style={styles.sectionTitle}>Farm Information</Text>
                <Text style={styles.subtext}>Fill In the following information about your farm</Text>

                <Text style={styles.label}>ESP32 ID</Text>
                <TextInput style={styles.input} value={esp32Id} onChangeText={setEsp32Id}
                           placeholder="ESP32 MAC Address"/>

                <Text style={styles.label}>Farm Name</Text>
                <TextInput style={styles.input} value={farmName} onChangeText={setFarmName} placeholder="Farm Name"/>

                <Text style={styles.label}>Farm Size</Text>
                <View style={styles.inlineInput}>
                    <TextInput style={styles.inputFlex} value={farmSize} onChangeText={setFarmSize} placeholder="100"
                               keyboardType="numeric"/>
                    <Picker
                        selectedValue={unit}
                        onValueChange={(itemValue) => setUnit(itemValue)}
                        style={styles.unitPicker}
                    >
                        <Picker.Item label="Acres" value="Acres"/>
                        <Picker.Item label="Hectares" value="Hectares"/>
                        <Picker.Item label="m²" value="Square Meters"/>
                        <Picker.Item label="Plots" value="Plots"/>
                    </Picker>
                </View>

                <Text style={styles.label}>Farm Location</Text>
                <TextInput style={styles.dropdownLocation} value={location} onChangeText={setLocation}/>

                <Text style={styles.label}>Soil Type</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={soilType}
                        onValueChange={(itemValue) => setSoilType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Loam" value="Loam"/>
                        <Picker.Item label="Clay" value="Clay"/>
                        <Picker.Item label="Sandy" value="Sandy"/>
                        <Picker.Item label="Silt" value="Silt"/>
                    </Picker>
                </View>

                <Text style={styles.label}>Crop Type</Text>
                <TextInput
                    style={styles.input}
                    value={cropType}
                    onChangeText={setCropType}
                    placeholder="Crop Type"
                />


                <Text style={styles.sectionTitle}>Sensor Information</Text>
                <Text style={styles.subtext}>Set irrigation triggers for your sensors</Text>
                <View style={stylesUpgraded.container}>
                    <Text style={stylesUpgraded.title}>Moisture Sensor</Text>
                    <Text style={stylesUpgraded.subtitle}>Threshold Range</Text>

                    <View style={stylesUpgraded.row}>
                        <View style={stylesUpgraded.inputWrapper}>
                            <Text style={stylesUpgraded.label}>Minimum Degree</Text>
                            <TextInput
                                style={stylesUpgraded.input}
                                value={moistureLower}
                                onChangeText={setMoistureLower}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={stylesUpgraded.inputWrapper}>
                            <Text style={stylesUpgraded.label}>Maximum Degree</Text>
                            <TextInput
                                style={stylesUpgraded.input}
                                value={moistureUpper}
                                onChangeText={setMoistureUpper}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>

                <View style={stylesUpgraded.container}>
                    <Text style={stylesUpgraded.title}>Temperature Sensor</Text>
                    <Text style={stylesUpgraded.subtitle}>Threshold Range</Text>

                    <View style={stylesUpgraded.row}>
                        <View style={stylesUpgraded.inputWrapper}>
                            <Text style={stylesUpgraded.label}>Minimum Degree</Text>
                            <TextInput
                                style={stylesUpgraded.input}
                                value={temperatureLower}
                                onChangeText={setTemperatureLower}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={stylesUpgraded.inputWrapper}>
                            <Text style={stylesUpgraded.label}>Maximum Degree</Text>
                            <TextInput
                                style={stylesUpgraded.input}
                                value={temperatureUpper}
                                onChangeText={setTemperatureUpper}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>


                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Add Farm</Text>
                </TouchableOpacity>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
            marginTop: -30,
            paddingBottom:useSafeAreaInsets+80,


    },
    logo
:
{
    width: 90,
        height
:
    90,
        resizeMode
:
    'contain',
        alignSelf
:
    'center',
        marginTop
:
    20,
}
,
heading: {
    fontSize: 20,
        fontWeight
:
    '600',
        marginTop
:
    10,
        textAlign
:
    'center',
}
,
sectionTitle: {
    marginTop: 20,
        fontSize
:
    16,
        fontWeight
:
    'bold',
    fontFamily: 'Nunito-Medium',
}
,
subtext: {
    color: '#888',
        marginBottom
:
    10,
}
,
label: {
    marginTop: 15,
        fontWeight
:
    'bold',
    fontFamily: 'Nunito-Bold',
}
,
input: {
    borderWidth: 1,
        borderColor
:
    '#ddd',
        borderRadius
:
    8,
        padding
:
    10,
        marginTop
:
    5,
}
,
inlineInput: {
    flexDirection: 'row',
        gap
:
    10,
}
,
inputFlex: {
    flex: 1,
        borderWidth
:
    1,
        borderColor
:
    '#ddd',
        borderRadius
:
    8,
        padding
:
    10,
        marginTop
:
    5,
}
,
dropdown: {
    width: 100,
        borderWidth
:
    1,
        borderColor
:
    '#ddd',
        borderRadius
:
    8,
        padding
:
    10,
        marginTop
:
    5,
}
,
dropdownLocation: {
    width: '100%',
        borderWidth
:
    1,
        borderColor
:
    '#ddd',
        borderRadius
:
    8,
        padding
:
    10,
        marginTop
:
    5,
}
,

addCropBtn: {
    alignSelf: 'flex-end',
        marginVertical
:
    5,
}
,
addCropText: {
    fontSize: 20,
        color
:
    '#4CAF50',
}
,
pickerWrapper: {
    borderWidth: 1,
        borderColor
:
    '#ccc',
        borderRadius
:
    8,
        backgroundColor
:
    '#f9f9f9',
        marginBottom
:
    10,
}
,
picker: {
    width: '100%',
}
,
submitButton: {
    backgroundColor: '#4CAF50',
        paddingVertical
:
    14,
        borderRadius
:
    8,
        alignItems
:
    'center',
        marginTop
:
    20,
}
,
submitText: {
    color: '#fff',
        fontSize
:
    16,
        fontWeight
:
    '600',
}
,
unitPicker: {
    flex: 1,
        height
:
    50,
        backgroundColor
:
    '#f9f9f9',
        borderColor
:
    '#ccc',
        borderWidth
:
    1,
        borderRadius
:
    8,
        marginLeft
:
    8,
}
,
})


const stylesUpgraded = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    inputWrapper: {
        flex: 1,
    },
    label: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
});