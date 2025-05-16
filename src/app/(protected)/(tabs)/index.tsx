import TitleWithSubtitle from "@components/TitleWithSubtitle"
import VehicleTile from "@components/VehicleTile"
import { useAuth } from "@context/authContext"
import { useTheme } from "@context/themeContext"
import { Vehicle } from "@utils/types"
import { Link } from "expo-router"
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { firestore } from "../../../../firebaseConfig"

const Home = () => {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { Colors } = useTheme()
  const { user } = useAuth()

  const styles = StyleSheet.create({
    btn: {
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      position: "fixed",
      bottom: 20,
      right: 15,
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
    if (!user?.uid) return

    const q = query(
      collection(firestore, "vehicles"),
      where("userUid", "==", user.uid)
    )
    const unsub = onSnapshot(
      q,
      (snap: QuerySnapshot) => {
        const vehicleList: Vehicle[] = snap.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        })) as Vehicle[]
        setVehicleData(vehicleList)
        setLoading(false)
      },
      (e) => {
        Alert.alert("Home", e.message)
        setLoading(false)
      }
    )

    return () => unsub()
  }, [user])

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.bg, paddingHorizontal: 20 }}
    >
      <TitleWithSubtitle
        style={{ marginBottom: 20 }}
        title={`Hello, ${user?.firstName}`}
        subtitle="Ready to track your ride?"
        sm
      />

      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            color={Colors.p}
            size="large"
          />
        </View>
      ) : (
        <FlatList
          data={vehicleData}
          keyExtractor={(item, index) =>
            item.uid ? item.uid : index.toString()
          }
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => <VehicleTile item={item} />}
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
              No Vehicle added yet.
            </Text>
          )}
          ListHeaderComponent={() => (
            <Text
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: Colors.text_sec,
                marginBottom: 10,
              }}
            >
              Your Vehicles
            </Text>
          )}
        />
      )}

      <Link
        href="/add-vehicles"
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

export default Home
