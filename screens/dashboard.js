import {View, Text, StyleSheet, ScrollView} from "react-native";
import FarmList from "../components/Dashboard/farmList";
import {useNavigation} from '@react-navigation/native';
import {Header} from "../components/header";
import { AuthContext } from '../context/authContext';
import {useContext} from "react";


export const Dashboard = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    navigation.screenOptions = {
        showBar: false,
    }


    return (


        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Welcome, {user?.username}!</Text>
            </View>
            <FarmList/>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,


    },
    text: {
        paddingHorizontal:10,
        fontFamily: "Nunito-Medium",
    }
})

