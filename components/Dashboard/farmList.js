import {ActivityIndicator, FlatList, RefreshControl, View} from "react-native";
import FarmItem from "./farm";
import {useCallback, useContext, useEffect, useState} from "react";
import {getUserFarms} from "../../services/api";
import {AuthContext} from "../../context/authContext";
import {AddFarmCard} from "./addFarmCard";


const FarmList = ({onRefresh}) => {

    const {user, token} = useContext(AuthContext);
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [refreshing, setRefreshing] = useState(false);

    const fetchFarms = async () => {
        setLoading(true);
        const response = await getUserFarms(user.id, token);
        if (response.success) {
            setFarms(response.farms);
        }
        setLoading(false);
    };



    useEffect(() => {
        fetchFarms();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    if (!farms.length && !loading) {
        return <AddFarmCard />; // show add farm card if empty
    }


    const renderItem = ({item}) => {
        return  <FarmItem
            name={item.name}
            location={item.location}
            crop={item.crop || 'Not set'}
            temp={item.temperature || 0}
            moist={item.moisture || 0}
        />
    }
    return (


        <View style={styles.container}>
            <FlatList
                data={farms}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                refreshControl={
                    <RefreshControl
                         refreshing={false} onRefresh={onRefresh}
                    />

                }


            />

        </View>

    )
}

const styles = {

    container: {
        display: "flex",
        backgroundColor: "white",
        paddingVertical: 10,


    },

}

export default FarmList