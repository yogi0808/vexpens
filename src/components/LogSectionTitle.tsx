import { useTheme } from "@context/themeContext"
import React from "react"
import { Text, View } from "react-native"

interface LogSectionTitleProp {
  title: string
  totalExpense: number
  totalIncome: number
  incomeGenerating: boolean
}

const LogSectionTitle: React.FC<LogSectionTitleProp> = ({
  title,
  totalExpense,
  totalIncome,
  incomeGenerating,
}) => {
  const { Colors } = useTheme()
  return (
    <View
      style={{
        backgroundColor: Colors.p_disabled,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 20,
          color: Colors.text_prim,
        }}
      >
        {title}
      </Text>
      <View style={{ alignItems: "center" }}>
        {incomeGenerating ? (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={{ fontSize: 14, color: Colors.p }}>{totalIncome}</Text>
            <Text style={{ color: Colors.text_prim, fontSize: 14 }}>|</Text>
            <Text style={{ fontSize: 14, color: "#f00" }}>
              - {totalExpense}
            </Text>
          </View>
        ) : (
          ""
        )}
        {totalExpense > totalIncome ? (
          <Text
            style={{
              fontSize: 20,
              color: Colors.text_prim,
            }}
          >
            ₹{totalExpense - totalIncome}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 20,
              color: "#0F0",
            }}
          >
            + ₹{totalIncome - totalExpense}
          </Text>
        )}
      </View>
    </View>
  )
}

export default LogSectionTitle
