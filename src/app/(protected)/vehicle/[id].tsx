import LogSectionTitle from "@components/LogSectionTitle"
import LogTile from "@components/LogTile"
import { useTheme } from "@context/themeContext"
import { Vehicle } from "@utils/types"
import { Link, useLocalSearchParams } from "expo-router"
import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { firestore } from "../../../../firebaseConfig"
import useGetLogs from "../../../hooks/useGetLogs"

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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { id } = useLocalSearchParams()
  const { Colors } = useTheme()

  const { loading, refreshing, reload, fetchNext, sections, hasMore } =
    useGetLogs(id.toString())

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
        setIsLoading(false)
      }
    }

    fetchVehicle()
    fetchNext()
  }, [id])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <Text style={styles.title}>{vehicleData?.name}</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.uid || ""}
        renderItem={({ item }) => (
          <LogTile
            log={item}
            vehicleName={vehicleData?.name || ""}
          />
        )}
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 20 }}>
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
            <Text
              style={{
                fontWeight: "600",
                fontSize: 26,
                marginBottom: 10,
                color: Colors.text_prim,
              }}
            >
              Log History
            </Text>
          </View>
        )}
        renderSectionHeader={({
          section: { title, totalExpense, totalIncome },
        }) => (
          <LogSectionTitle
            title={title}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            incomeGenerating={vehicleData?.incomeGenerating || false}
          />
        )}
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.p}
            />
          ) : null
        }
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (!loading && hasMore) {
            fetchNext()
          }
        }}
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
        refreshing={refreshing}
        onRefresh={reload}
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
