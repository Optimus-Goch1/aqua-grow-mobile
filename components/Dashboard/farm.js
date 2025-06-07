import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {scaleHeight} from "../../utils/scaling";
import {Dial} from "../dial";
import {images} from "../../constants/images";


const FarmItem = ({name, location, crop, temperature, moisture}) => {
    const navigation = useNavigation();


    return (
        <TouchableOpacity style={styles.card}
                          onPress={() => navigation.navigate("FarmDetail", {name, location, crop, temperature, moisture})}>
            <View>
                <Text style={styles.text}>{name}</Text>

                <Image source={images.farm} style={styles.image}/>

                <View style={styles.dialsRow}>
                    <Dial color="blue" fill={moist} text={"Moisture"}/>

                    <Dial color="red" fill={temp} text={"Temperature"}/>


                </View>

            </View>


        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 15,
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'top',
        justifyContent: 'center',
        gap: 20,
        width: "45%",
        height: scaleHeight(250),
        marginLeft: 15


    },
    dialsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45,
        width: '100%',


    },
    text: {
        fontFamily: "Inter",
    },
    image: {
        width: "107%",
        height: scaleHeight(120),
        borderRadius: 2,
        marginBottom: -40,
        marginLeft: -6,
        marginTop:5,
    },
})

export default FarmItem