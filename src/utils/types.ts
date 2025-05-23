export type VehicleType = "" | "Car" | "Bike" | "Scooter" | "Pickup Truck" | "Mini Truck" | "Truck" | "Transport Bus" | "Tractor" | "JCB" | "Towing Van"

export interface Vehicle {
    uid?: string;
    userUid?: string;
    name: string;
    type: VehicleType;
    incomeGenerating: boolean;
    number: string;
    createdAt?: number;
}

export interface VehicleLog {
    uid?: string;
    userUid: string;
    vehicleUid: string;
    vehicleName?: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description?: string;
    createdAt?: number;
}