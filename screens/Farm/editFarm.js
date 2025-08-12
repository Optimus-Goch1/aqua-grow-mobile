import React, {useContext, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {deleteFarm, updateFarm} from '../../services/api';
import {AuthContext} from "../../context/authContext";

export default function EditFarm() {
    const route = useRoute();
    const {id, name, location, crop, size} = route.params;
    const [farmName, setFarmName] = useState(name);
    const [farmSize, setFarmSize] = useState(size);
    const [farmLocation, setFarmLocation] = useState(location);
    const [soil, setSoil] = useState('');
    const [cropType, setCropType] = useState(crop);

    console.log(id)

    const navigation = useNavigation();
    const {token} = useContext(AuthContext);

    const handleSave = async () => {
        if (!farmName || !farmLocation || !cropType) {
            Alert.alert("Missing Info", "Please fill all required fields.");
            return;
        }

        const payload = {
            farm_name: farmName,
            soil_type: soil,
            crop_type: cropType,
        };

        console.log(id);
        const result = await updateFarm(token, id, payload);

        console.log(id);

        if (result.success) {
            Alert.alert("Success", "Farm updated successfully");
            navigation.goBack();
        } else {
            Alert.alert("Update Failed", result.message);
        }
    };


    const handleDelete = async () => {
        console.log(id)
        const result = await deleteFarm(token, id);

        if (result.success) {
            Alert.alert("Deleted", result.message);
            navigation.navigate("DashboardHome");
        } else {
            Alert.alert("Error", result.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                        Alert.alert(
                            "Delete Farm",
                            "Are you sure you want to delete this farm? This action cannot be undone.",
                            [
                                {text: "Cancel", style: "cancel"},
                                {
                                    text: "Delete",
                                    style: "destructive",
                                    onPress: () => handleDelete(), // your delete logic here
                                },
                            ]
                        );
                    }}
                >
                    <Ionicons name="trash-outline" size={16} color="red"/>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>


            <Text style={styles.sectionTitle}>Farm Information</Text>

            <Text style={styles.label}>Name</Text>
            <View style={styles.input}>
                <TextInput
                    value={farmName}
                    onChangeText={setFarmName}
                />
            </View>

            <Text style={styles.label}>Farm Size</Text>
            <View style={styles.row}>
                <TextInput
                    value={farmSize}
                    onChangeText={setFarmSize}
                    keyboardType="numeric"
                    style={styles.input}
                />
            </View>


            <Text style={styles.label}>Farm Location {id}</Text>
            <View style={styles.input}>
                <TextInput
                    value={farmLocation}
                    onChangeText={setFarmLocation}
                />
            </View>

            <Text style={styles.label}>Soil Type</Text>
            <View style={styles.input}>
                <Picker style={styles.picker}
                        selectedValue={soil}
                        onValueChange={(itemValue) => setSoil(itemValue)}
                >
                    <Picker.Item label="Loam" value="Loam"/>
                    <Picker.Item label="Clay" value="Clay"/>
                    <Picker.Item label="Sandy" value="Sandy"/>
                </Picker>
            </View>

            <Text style={styles.label}>Crop Type</Text>
            <TextInput style={styles.input}
                       value={cropType}
                       onChangeText={setCropType}
            />


            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save changes</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal:
            15,
        paddingTop:
            50,
    }
    ,
    header: {
        flexDirection: 'row-reverse',
        alignItems:
            'center',
        justifyContent:
            'space-between',
    }
    ,
    logoWrapper: {
        alignItems: 'center',
    }
    ,
    logo: {
        height: 40,
        width:
            40,
    }
    ,
    logoText: {
        color: 'green',
        fontWeight:
            'bold',
        fontSize:
            16,
    }
    ,
    deleteBtn: {
        borderWidth: 1,
        borderColor:
            'red',
        paddingHorizontal:
            12,
        paddingVertical:
            4,
        borderRadius:
            6,
        flexDirection:
            'row-reverse',
        alignItems:
            'center',


    }
    ,
    deleteText: {
        color: 'red',
        marginRight:
            1,
    }
    ,

    picker: {
        flex: 1,
        height: 50,
        fontSize: 12,
        // color: '#000',

    },
    titleWrapper: {
        marginTop: 20,
        marginBottom:
            10,
    }
    ,
    farmTitle: {
        fontSize: 18,
        fontWeight:
            '600',
    }
    ,
    subText: {
        color: '#888',
    }
    ,
    sectionTitle: {
        fontSize: 16,
        fontWeight:
            'bold',
        marginTop:
            20,
        marginBottom:
            8,
    }
    ,
    label: {
        marginTop: 12,
        marginBottom:
            4,
        fontWeight:
            '500',
    }
    ,
    input: {
        borderWidth: 1,
        borderColor:
            '#ccc',
        borderRadius:
            8,
        paddingHorizontal:
            10,
        // paddingVertical: 1,
        flex: 1,
        backgroundColor:
            '#f9f9f9',
    }
    ,
    row: {
        flexDirection: 'row',
        alignItems:
            'center',
    }
    ,
    addBtn: {
        marginTop: 8,
        alignSelf:
            'flex-start',
        padding:
            8,
        borderWidth:
            1,
        borderColor:
            '#ccc',
        borderRadius:
            6,
    }
    ,
    navbar: {
        marginTop: 30,
        flexDirection:
            'row',
        justifyContent:
            'space-around',
        paddingVertical:
            12,
        borderTopWidth:
            1,
        borderTopColor:
            '#ddd',
    }
    ,
    navItem: {
        alignItems: 'center',
    }
    ,
    activeNav: {
        backgroundColor: '#eaf7ec',
        borderRadius:
            10,
        padding:
            6,
    }
    ,

    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },


});