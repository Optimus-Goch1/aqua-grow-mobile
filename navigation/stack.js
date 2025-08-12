import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from "../screens/dashboard";
import {FarmDetails} from "../screens/Farm/farmDetail";
import IrrigationControl from "../screens/irrigationControl";
import EditFarm from "../screens/Farm/editFarm";


const Stack = createStackNavigator();

export const DashboardStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: true}}/>
            <Stack.Screen name="FarmDetail" component={FarmDetails}/>
            <Stack.Screen name="Irrigation Control" component={IrrigationControl} />
            <Stack.Screen name="Edit Farm" component={EditFarm} />

        </Stack.Navigator>
    );
};

export const FarmDetailStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Irrigation Control" component={IrrigationControl}/>
        </Stack.Navigator>
    )
}


