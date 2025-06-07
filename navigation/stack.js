import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from "../screens/dashboard";
import {FarmDetails} from "../screens/Farm/farmDetail";
import {CreateFarm} from "../screens/Farm/createFarm";


const Stack = createStackNavigator();

export const DashboardStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: true}}/>
            <Stack.Screen name="FarmDetail" component={FarmDetails}/>
            {/*<Stack.Screen name="CreateFarm" component={CreateFarm}/>*/}

        </Stack.Navigator>
    );
};


