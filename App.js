import {NavigationContainer} from '@react-navigation/native';
import {BottomTab} from "./navigation/tabs";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Welcome from "./screens/welcome";
import React, {useState, useEffect} from "react";
import { View, ActivityIndicator } from "react-native";
import * as Font from 'expo-font';
import Login from "./screens/login";
import {AuthProvider} from "./context/authContext";
import Signup from "./screens/signup";


const loadFonts = () => {
    return Font.loadAsync({
        'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
        'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
        'Nunito-Variable': require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
    });
};

const Stack = createNativeStackNavigator();

export default function App() {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts()
            .then(() => setFontsLoaded(true))
            .catch(console.warn);
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name ="Signup" component = {Signup} options={{headerShown: false}}/>
                    <Stack.Screen name="Home" component={BottomTab} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}