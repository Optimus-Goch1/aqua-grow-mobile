import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Settings} from "../screens/settings";
import {Notifications} from "../screens/notifications";
import {DashboardStack} from "./stack";
import {hp, wp} from "../utils/dimensions";
import {icons} from "../constants/icons";
import {View, Image, Text, StyleSheet} from "react-native";
import {CreateFarm} from "../screens/Farm/createFarm";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, title }) => {
    if (focused) {
        return (
            <View style={[styles.focusedContainer, { minWidth: wp(28), minHeight: hp(4) }]}>
                <Image source={icon} style={styles.focusedIcon} />
                <Text style={styles.focusedText}>{title}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.unfocusedContainer, { marginTop: hp(4) }]}>
            <Image source={icon} style={styles.unfocusedIcon} />
        </View>
    );
};

export const BottomTab = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",

                },
            }}>
            <Tab.Screen name="Dashboard" component={DashboardStack} options={{

                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon={icons.dashboard} title="Dashboard"/>
                ),
            }}/>
            <Tab.Screen name="Notifications" component={Notifications}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => (
                                <TabIcon focused={focused} icon={icons.notification} title="Notifications"/>
                            ),
                        }}/>
            <Tab.Screen name="CreateFarm" component={CreateFarm}
                        options={{
                            headerShown: true,
                            tabBarIcon: ({focused}) => (
                                <TabIcon focused={focused} icon={icons.add} title="Add Farm"/>
                            )
                        }}

            />
            <Tab.Screen name="Settings" component={Settings}
                        options={{
                            title: "Settings",
                            headerShown: false,
                            tabBarIcon: ({focused}) => (
                                <TabIcon focused={focused} icon={icons.settings} title="Settings"/>
                            ),
                        }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    focusedContainer: {
        backgroundColor: '#4CAF501A',
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    focusedIcon: {
        height: 26,
        width: 24,
        tintColor: '#4CAF50',
    },
    focusedText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 8,
        fontFamily: 'Inter',
    },
    unfocusedContainer: {
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    unfocusedIcon: {
        width: 26,
        height: 24,
        tintColor: '#A8B5DB',
    },
});

