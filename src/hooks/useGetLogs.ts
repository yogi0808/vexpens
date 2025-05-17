import { VehicleLog } from "@utils/types";
import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../firebaseConfig";


type Section = {
    totalIncome: number
    totalExpense: number
    title: string; // Month title like "August 2025"
    data: VehicleLog[];
};


const useGetLogs = (vehicleUid: string) => {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [monthOffset, setMonthOffset] = useState<number>(0); // How many months back
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchLogsForMonth = async (offset: number): Promise<Section | null> => {
        try {
            const now = new Date();
            const currentMonth = new Date(now.getFullYear(), now.getMonth() - offset, 1)
            const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
            let totalIncome = 0
            let totalExpense = 0

            const startTimestamp = Timestamp.fromDate(currentMonth);
            const endTimestamp = Timestamp.fromDate(nextMonth);

            const logsQuery = query(
                collection(firestore, "logs"),
                where("vehicleId", "==", vehicleUid),
                where('createdAt', ">=", startTimestamp),
                where("createdAt", "<", endTimestamp),
                orderBy("createdAt", "desc")
            )

            const snapshot = await getDocs(logsQuery)

            if (snapshot.empty) return null

            const logs: VehicleLog[] = snapshot.docs.map(doc => {
                const data = doc.data()

                if (data.type === 'income') {
                    totalIncome += data.amount
                } else if (data.type === 'expense') {
                    totalExpense += data.amount
                }

                return {
                    uid: doc.id,
                    ...data
                }
            }) as VehicleLog[]

            const sectionTitle = currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric"
            })
            return {
                title: sectionTitle,
                data: logs,
                totalExpense,
                totalIncome
            }
        } catch (e) {
            console.log("Failed to fetch Logs:", e)
            return null
        }
    }

    const fetchNext = async () => {
        setLoading(true)
        const section = await fetchLogsForMonth(monthOffset)
        if (section) {
            setSections(prev => [...prev, section])
        } else {
            setHasMore(false)
        }

        setMonthOffset(prev => prev + 1)
        setLoading(false)
    }

    const reload = async () => {
        setRefreshing(true);
        setMonthOffset(0);
        setHasMore(true);
        const section = await fetchLogsForMonth(0);
        if (section) {
            setSections([section]);
            setMonthOffset(1);
        } else {
            setSections([]);
        }
        setRefreshing(false);
    };


    return { sections, loading, fetchNext, hasMore, reload, refreshing }

}

export default useGetLogs