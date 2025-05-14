import { ThemeContext } from "@context/themeContext"
import React, { useContext } from "react"
import { StyleProp, Text, View, ViewStyle } from "react-native"

type PropType = {
  style?: StyleProp<ViewStyle>
  title: string
  subtitle: string
  sm?: boolean
}

const TitleWithSubtitle = ({ style, title, subtitle, sm }: PropType) => {
  const { Colors } = useContext(ThemeContext)

  return (
    <View style={[{ marginBottom: 30 }, style]}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: sm ? 20 : 28,
          color: Colors.text_prim,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: sm ? 14 : 16, color: Colors.text_tert }}>
        {subtitle}
      </Text>
    </View>
  )
}

export default TitleWithSubtitle
