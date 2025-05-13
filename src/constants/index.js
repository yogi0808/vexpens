
export const onBoardingData = [
    {
        id: "1",
        title: "Track Every Ride",
        subtitle: "Easily log fuel, repairs, services, and more — all in one place.",
        image: require("@assets/images/on_boarding_1.png")
    },
    {
        id: "2",
        title: "Know Where Your Money Goes",
        subtitle: "Get insights on your vehicle expenses and spot trends over time.",
        image: require("@assets/images/on_boarding_2.png")
    },
    {
        id: "3",
        title: "Stay Organized, Always",
        subtitle: "Never miss a service again with timely reminders and history tracking.",
        image: require("@assets/images/on_boarding_3.png")
    }
]

export const logo = require("@assets/images/adaptive-icon.png")

export const VehicleIcon = {
    "Car": require("@assets/vehicleIcons/Car.png"),
    "Bike": require("@assets/vehicleIcons/Bike.png"),
    "Scooter": require("@assets/vehicleIcons/Scooter.png"),
    "Pickup Truck": require("@assets/vehicleIcons/Pickup Truck.png"),
    "Mini Truck": require("@assets/vehicleIcons/Mini Truck.png"),
    "Truck": require("@assets/vehicleIcons/Truck.png"),
    "Transport Bus": require("@assets/vehicleIcons/Transport Bus.png"),
    "Tractor": require("@assets/vehicleIcons/Tractor.png"),
    "JCB": require("@assets/vehicleIcons/JCB.png"),
    "Towing Van": require("@assets/vehicleIcons/Towing Van.png"),
}

export const dropdownDataForVehicleType = [
    { label: "Car", value: "Car" },
    { label: "Bike", value: "Bike" },
    { label: "Scooter", value: "Scooter" },
    { label: "Pickup Truck", value: "Pickup Truck" },
    { label: "Mini Truck", value: "Mini Truck" },
    { label: "Truck", value: "Truck" },
    { label: "Transport Bus", value: "Transport Bus" },
    { label: "Tractor", value: "Tractor" },
    { label: "JCB", value: "JCB" },
    { label: "Towing Van", value: "Towing Van" },
]

export const dropdownDataForExpenseLog = [
    { label: "Fuel", value: "Fuel" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Repairs", value: "Repairs" },
    { label: "Parking", value: "Parking" },
    { label: "Tolls", value: "Tolls" },
    { label: "Cleaning", value: "Cleaning" },
    { label: "Loan Payment", value: "Loan Payment" },
    { label: "Accessories ", value: "Accessories " },
    { label: "Taxes", value: "Taxes" },
    { label: "Other Expense", value: "Other Expense" }
]

export const lightTheme = {
    bg: '#FFFFFF',
    bg_muted: '#F9FAFB',
    bg_surface: '#F3F4F6',
    text_prim: '#111827',
    text_sec: '#6B7280',
    text_tert: '#6B7280',
    p: '#3A5AFF',
    p_hover: '#2F4DE6',
    p_pressed: '#243FCC',
    p_disabled: '#B3C5FF',
    border_def: '#E5E7EB',
    border_act: '#3A5AFF',
    border_dis: '#D1D5DB'
};

export const darkTheme = {
    bg: '#121212',
    bg_muted: '#1E1E1E',
    bg_surface: '#1A1A1A',
    text_prim: '#F3F4F6',
    text_sec: '#D1D5DB',
    text_tert: '#9CA3AF',
    p: '#5C7CFF',
    p_hover: '#4C6EF5',
    p_pressed: '#3F5AE0',
    p_disabled: '#5C7CFF40',
    border_def: '#2A2A2A',
    border_act: '#5C7CFF',
    border_dis: '#3A3A3A'
}

export const storeKeys = {
    alreadyLaunched: "ALREDY_LAUNCHED",
    auth: "AUTH"
}