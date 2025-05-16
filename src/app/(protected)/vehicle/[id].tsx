import { useTheme } from "@context/themeContext"
import { Vehicle } from "@utils/types"
import { Link, useLocalSearchParams } from "expo-router"
import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { firestore } from "../../../../firebaseConfig"

const DataView = ({ label, data }: { label: string; data: string }) => {
  const { Colors } = useTheme()

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text
        style={{
          fontWeight: "700",
          fontSize: 16,
          color: Colors.text_prim,
        }}
      >
        {label}:{" "}
      </Text>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 16,
          color: Colors.text_sec,
          width: 250,
        }}
      >
        {data}
      </Text>
    </View>
  )
}

const SingleVehicle = () => {
  const [vehicleData, setVehicleData] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useLocalSearchParams()
  const { Colors } = useTheme()

  const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: Colors.text_prim,
      textAlign: "center",
      marginBottom: 20,
    },
    divider: {
      marginVertical: 10,
      height: 2,
      backgroundColor: Colors.border_def,
    },
    btn: {
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      position: "absolute",
      bottom: 40,
      right: 25,
      alignSelf: "flex-end",
      backgroundColor: Colors.p,
      transform: [{ rotateZ: "45deg" }, { translateX: -10 }],
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      shadowOpacity: 0.1,
    },
    btnText: {
      fontSize: 38,
      color: "white",
      transform: [{ rotateZ: "-45deg" }],
    },
  })

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        if (!id) return Alert.alert("Vehicle", "No id Found.")
        const docRef = doc(firestore, "vehicles", id.toString())

        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setVehicleData({ uid: docSnap.id, ...docSnap.data() } as Vehicle)
        } else {
          throw new Error("No vehicle found for this ID.")
        }
      } catch (e: any) {
        Alert.alert("Vechicle", e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [id])

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: Colors.bg }}
    >
      <Text style={styles.title}>{vehicleData?.name}</Text>
      <FlatList
        data={[]}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListHeaderComponent={() => (
          <>
            <View style={{ gap: 10 }}>
              <DataView
                label="Vehicle Type"
                data={vehicleData?.type || ""}
              />
              <DataView
                label="Vehicle Number"
                data={vehicleData?.number || ""}
              />
              <DataView
                label="Use for Income"
                data={vehicleData?.incomeGenerating ? "Yes" : "No"}
              />
            </View>
            <View style={styles.divider} />
            <View style={{ gap: 5 }}>
              <DataView
                label="Total Income"
                data="₹50,000"
              />
              <DataView
                label="Total Expenses"
                data="₹20,000"
              />
              <DataView
                label="Total Profit/Loss"
                data="+ ₹30,000"
              />
            </View>
            <View style={styles.divider} />
            <Text
              style={{
                fontWeight: "600",
                fontSize: 18,
                marginBottom: 10,
                color: Colors.text_prim,
              }}
            >
              Log History
            </Text>
          </>
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              color: Colors.text_sec,
              opacity: 0.2,
            }}
          >
            No Log Found.
          </Text>
        )}
      />
      <Link
        href={{
          pathname: "/add-logs",
          params: {
            vehicleId: id,
            incomeGenerating: vehicleData?.incomeGenerating.toString(),
          },
        }}
        asChild
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  )
}

export default SingleVehicle
