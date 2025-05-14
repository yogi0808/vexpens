import { useTheme } from "@context/themeContext"
import React, { useContext } from "react"
import { StyleProp, StyleSheet, Text, TouchableOpacity } from "react-native"
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes"

const Button = ({
  style,
  text,
  onPress,
  disabled = false,
}: {
  style?: StyleProp<ViewStyle>
  onPress: () => void
  text: string
  disabled?: boolean
}) => {
  const { Colors } = useTheme()

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: disabled ? Colors.p_disabled : Colors.p,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.border_dis,
    },
    btnText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
  })

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[style, styles.btn]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
