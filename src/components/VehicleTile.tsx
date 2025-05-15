import { useTheme } from "@context/themeContext"
import { VehicleIcon } from "@data/index"
import { Vehicle } from "@utils/types"
import { Link } from "expo-router"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

const VehicleTile = ({ item }: { item: Vehicle }) => {
  const { Colors } = useTheme()
  return (
    <Link
      href={{
        pathname: "/vehicle/[id]",
        params: {
          id: item.uid || "",
        },
      }}
      asChild
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          padding: 15,
          borderWidth: 2,
          borderColor: Colors.border_act,
          gap: 10,
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        {item.type !== "" && (
          <Image
            //   @ts-ignore
            source={VehicleIcon[item.type]}
            style={{
              position: "absolute",
              right: -10,
              bottom: -10,
              width: 150,
              height: 70,
              opacity: 0.5,
            }}
            resizeMode="contain"
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: Colors.text_prim, fontWeight: "500" }}>
            {item.type}
          </Text>
          <Text style={{ color: Colors.text_sec, fontWeight: "500" }}>
            {item.number}
          </Text>
        </View>
        <Text
          style={{
            color: Colors.text_prim,
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default VehicleTile
