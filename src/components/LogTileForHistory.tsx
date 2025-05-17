import { useTheme } from "@context/themeContext"
import { VehicleLog } from "@utils/types"
import { formatDate } from "@utils/utils"
import React from "react"
import { Text, View } from "react-native"

interface LogTileForHistoryProp {
  log: VehicleLog
}

const LogTileForHistory: React.FC<LogTileForHistoryProp> = ({ log }) => {
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
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: Colors.text_prim,
          }}
        >
          {log.vehicleName}
        </Text>
        <Text
          style={{ fontWeight: "500", fontSize: 12, color: Colors.text_sec }}
        >
          {formatDate(log.createdAt)}
        </Text>
      </View>
      <View>
        {log.type === "income" ? (
          <Text
            style={{
              fontSize: 18,
              color: "#0F0",
            }}
          >
            + ₹{log.amount}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 18,
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

export default LogTileForHistory
