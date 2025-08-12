import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import FarmItem from "./farm";
import { useCallback, useContext, useState } from "react";
import { getSensorData, getUserFarms } from "../../services/api";
import { AuthContext } from "../../context/authContext";
import { AddFarmCard } from "./addFarmCard";
import { useFocusEffect } from "@react-navigation/native";

const FarmList = () => {
    const { token, user, loading: authLoading } = useContext(AuthContext);
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchFarms = async () => {
        if (!token) {
            console.warn("Token is missing. Skipping fetch.");
            return;
        }

        setLoading(true);
        const response = await getUserFarms(token);

        if (response.success) {
            const baseFarms = response.farms.farms;

            const farmsWithSensorData = await Promise.all(
                baseFarms.map(async (farm) => {
                    const sensorResponse = await getSensorData(token, farm.id);
                    if (sensorResponse.success) {
                        return {
                            ...farm,
                            moisture: sensorResponse.data.moisture,
                            temperature: sensorResponse.data.temperature,
                        };
                    } else {
                        return {
                            ...farm,
                            moisture: null,
                            temperature: null,
                        };
                    }
                })
            );

            setFarms(farmsWithSensorData);
        }

        setLoading(false);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchFarms();
        setRefreshing(false);
    }, [token]);

    useFocusEffect(
        useCallback(() => {
            if (!authLoading && token) {
                fetchFarms();
            }
        }, [authLoading, token])
    );

    if (loading || authLoading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    if (!farms.length && !loading) {
        return <AddFarmCard />;
    }

    const renderItem = ({ item }) => (
        <FarmItem
            name={item.name}
            location={item.location}
            crop={item.crop_type || "Not set"}
            temperature={item.temperature || 0}
            moisture={item.moisture || 0}
            size={item.size}
            id={item.id}
            esp32Id={item.esp32_id}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={farms}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                numColumns={2}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

const styles = {
    container: {
        display: "flex",
        backgroundColor: "white",
        paddingVertical: 10,
    },
};

export default FarmList;