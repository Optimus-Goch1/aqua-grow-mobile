import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import { Picker } from '@react-native-picker/picker';


export const CreateFarm = () => {
    const [farmName, setFarmName] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [unit, setUnit] = useState('');
    const [location, setLocation] = useState('');
    const [soilType, setSoilType] = useState('');
    const [cropTypes, setCropTypes] = useState(['']);

    const handleAddCrop = () => {
        setCropTypes([...cropTypes, '']);
    };

    const updateCrop = (index, value) => {
        const newCrops = [...cropTypes];
        newCrops[index] = value;
        setCropTypes(newCrops);
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.sectionTitle}>Farm Information</Text>
            <Text style={styles.subtext}>Fill In the following information about your farm</Text>

            <Text style={styles.label}>ESP32 ID</Text>
            <TextInput style={styles.input} placeholder="ESP32 MAC Address"/>

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
                    <Picker.Item label="Acres" value="Acres" />
                    <Picker.Item label="Hectares" value="Hectares" />
                    <Picker.Item label="m²" value="Square Meters" />
                    <Picker.Item label="Plots" value="Plots" />
                </Picker>
            </View>

            <Text style={styles.label}>Farm Location</Text>
            <TextInput style={styles.dropdownLocation} value={location} editable={true}/>

            <Text style={styles.label}>Soil Type</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={soilType}
                    onValueChange={(itemValue) => setSoilType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Loam" value="Loam" />
                    <Picker.Item label="Clay" value="Clay" />
                    <Picker.Item label="Sandy" value="Sandy" />
                    <Picker.Item label="Silt" value="Silt" />
                </Picker>
            </View>

            <Text style={styles.label}>Crop Type</Text>
            <TouchableOpacity onPress={handleAddCrop} style={styles.addCropBtn}>
                <Text style={styles.addCropText}>+</Text>
            </TouchableOpacity>

            {cropTypes.map((crop, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    placeholder={`Crop ${index + 1}`}
                    value={crop}
                    onChangeText={(text) => updateCrop(index, text)}
                />
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={() => console.log('Farm submitted')}>
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
        marginTop: -20,
    },
    logo: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
    },
    sectionTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtext: {
        color: '#888',
        marginBottom: 10,
    },
    label: {
        marginTop: 15,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },
    inlineInput: {
        flexDirection: 'row',
        gap: 10,
    },
    inputFlex: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },
    dropdown: {
        width: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },
    dropdownLocation: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },

    addCropBtn: {
        alignSelf: 'flex-end',
        marginVertical: 5,
    },
    addCropText: {
        fontSize: 20,
        color: '#4CAF50',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    picker: {
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    unitPicker: {
        flex: 1,
        height: 50,
        backgroundColor: '#f9f9f9',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginLeft: 8,
    },
})