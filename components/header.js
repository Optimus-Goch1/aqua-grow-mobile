import {Image, SafeAreaView, View} from "react-native";
import {scaleHeight, scaleWidth} from "../utils/scaling";
import {Dial} from "./dial";


export const Header = () => {
    return (
        <SafeAreaView>
            <View style={{alignItems: "center"}}>
                <Image source={require("../assets/icons/logo.png")} style={{
                    width: scaleWidth(80),
                    height: scaleHeight(80),
                    resizeMode: "contain"

                }}/>
            </View>
        </SafeAreaView>
    )
}

