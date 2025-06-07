import {View, Text, StyleSheet} from "react-native";
import {Header} from "../components/header";


export const Notifications = () => {
    return (
        <View>
            <Header/>
            <Text style={styles.text}>Notifications</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        paddingHorizontal: 10
    }
})