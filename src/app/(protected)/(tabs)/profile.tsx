import { useAuth } from "@context/authContext"
import { useTheme } from "@context/themeContext"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const DataTile = ({ lable, value }: { lable: string; value: string }) => {
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
        {lable} :
      </Text>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 16,
          color: Colors.text_sec,
        }}
      >
        {value}
      </Text>
      <Ionicons
        name="chevron-forward-outline"
        color={Colors.text_tert}
        size={24}
      />
    </View>
  )
}

const Profile = () => {
  const { user, logOut } = useAuth()
  const { Colors } = useTheme()

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: Colors.bg }}
    >
      <View style={{ flex: 1, gap: 10 }}>
        <View
          style={{
            marginBottom: 20,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              color: Colors.text_prim,
            }}
          >
            Profile
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={logOut}
          >
            <Ionicons
              name="log-out-outline"
              color={Colors.text_sec}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <DataTile
          lable="Full Name"
          value={user?.firstName + " " + user?.lastName}
        />
        <DataTile
          lable="E-mail"
          value={user?.email || ""}
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile
