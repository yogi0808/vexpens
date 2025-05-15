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

export function validateData(type, data) {
    switch (type) {
        case "login":
            return chackLoginData(data)
        case "register":
            return chackRegisterData(data)
        case "vehicle":
            return checkVehicleData(data)
        default:
            return false
    }
}


function chackLoginData(data) {
    if (!emailRegex.test(data.email)) {
        return "Invalid E-mail Address"
    } else if (!data.password || data.password.length < 6) {
        return "Password must be at least 6 characters long."
    }
    return true
}

function chackRegisterData(data) {
    if (!data.firstName || data.firstName.length < 3) {
        return "First Name must be at least 3 characters long."
    } else if (!data.lastName || data.lastName.length < 3) {
        return "Last Name must be at least 3 characters long."
    } else if (!emailRegex.test(data.email)) {
        return "Invalid E-mail Address"
    } else if (!data.password || data.password.length < 6) {
        return "Password must be at least 6 characters long."
    } else if (data.password !== data.cPassword) {
        return "Confirm Password does not Match."
    }
    return true
}

// firebaseErrorMapper

export const getFriendlyFirebaseError = (error) => {
    const code = error?.code || "unknown";

    const errorMap = {
        "auth/invalid-credential": "Invalid credentials.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/email-already-in-use": "This email is already registered.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/invalid-email": "Invalid email address.",
        "auth/missing-password": "Password is required.",
        "auth/network-request-failed": "Network error. Please check your connection.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
    }

    return errorMap[code] || error.message
}

function checkVehicleData(data) {
    if (!data.name || data.name.length < 3) {
        return "Name must be at least 3 characters long."
    } else if (!data.type || data.type === "") {
        return "Select the Vehicle type."
    } else if (!NumberPlateRegex.test(data.number)) {
        return "Invalid Vehicle number."
    }

    return true
}