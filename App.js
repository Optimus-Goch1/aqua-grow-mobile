import {NavigationContainer} from '@react-navigation/native';
import {BottomTab} from "./navigation/tabs";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Welcome from "./screens/welcome";
import React from "react";
import Login from "./screens/login";
import {AuthProvider} from "./context/authContext";
import Signup from "./screens/signup";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name ="Signup" component = {Signup} options={{headerShown: false}}/>
                    <Stack.Screen name="Dashboard" component={BottomTab} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}


