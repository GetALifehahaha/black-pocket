import * as Font from 'expo-font'

export const useCustomFont = () => {
    Font.loadAsync({
        "Urbanist": require("../assets/fonts/Urbanist_VariableFont_wght.ttf")
    })
}