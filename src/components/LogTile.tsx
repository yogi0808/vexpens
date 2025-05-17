import { useTheme } from "@context/themeContext"
import { VehicleLog } from "@utils/types"
import { formatDate } from "@utils/utils"
import React from "react"
import { Text, View } from "react-native"

interface LogTileProp {
  log: VehicleLog
  vehicleName: string
}

const LogTile: React.FC<LogTileProp> = ({ log, vehicleName }) => {
  const { Colors } = useTheme()
  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        {log.type === "expense" ? (
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: Colors.text_prim,
            }}
          >
            {log.category}
          </Text>
        ) : (
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: Colors.text_prim,
            }}
          >
            {vehicleName}
          </Text>
        )}
        <Text style={{ fontWeight: "500", color: Colors.text_sec }}>
          {formatDate(log.createdAt)}
        </Text>
      </View>
      <View>
        {log.type === "income" ? (
          <Text
            style={{
              fontSize: 20,
              color: "#0F0",
            }}
          >
            + ₹{log.amount}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 20,
              color: Colors.text_prim,
            }}
          >
            ₹{log.amount}
          </Text>
        )}
      </View>
    </View>
  )
}

export default LogTile
