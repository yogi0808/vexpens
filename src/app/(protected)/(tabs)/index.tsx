import TitleWithSubtitle from "@components/TitleWithSubtitle"
import VehicleTile from "@components/VehicleTile"
import { useTheme } from "@context/themeContext"
import { Vehicle } from "@utils/types"
import { Link } from "expo-router"
import React from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const data: Vehicle[] = [
  {
    uid: "2",
    userUid: "3",
    name: "Swift",
    type: "Car",
    number: "GJ01AA0001",
    incomeGenerating: false,
  },
  {
    uid: "3",
    userUid: "3",
    name: "16 vehile",
    type: "Truck",
    number: "GJ01AA3458",
    incomeGenerating: true,
  },
]

const Home = () => {
  const { Colors } = useTheme()

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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.bg, paddingHorizontal: 20 }}
    >
      <TitleWithSubtitle
        style={{ marginBottom: 20 }}
        title="Hello, Yogesh"
        subtitle="Ready to track your ride?"
        sm
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.uid}
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
