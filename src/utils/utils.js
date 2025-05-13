import AsyncStorage from "@react-native-async-storage/async-storage"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NumberPlateRegex = /^[A-Z]{2}[-\s]?\d{1,2}[-\s]?[A-Z]{1,3}[-\s]?\d{1,4}$/i

export const storeData = async (key, data) => {
    try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.error("Error saving data to AsyncStorage: ", e)
    }
}


export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)

        return JSON.parse(value)
    } catch (e) {
        console.error("Error geting data from AsyncStorage: ", e)
    }
}
