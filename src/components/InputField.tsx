import { useTheme } from "@context/themeContext"
import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

type InputFieldProp = {
  title: string
  placeholder: string
  value: string
  onChange: (t: string) => void
  iconName: string
  number?: boolean
  multiline?: boolean
}

const InputField: React.FC<InputFieldProp> = ({
  title,
  placeholder,
  value,
  iconName,
  onChange,
  number,
  multiline,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  const { Colors } = useTheme()

  const styles = StyleSheet.create({
    wrapper: {
      gap: 5,
      flex: 1,
    },
    title: {
      left: 8,
      fontWeight: "bold",
      color: Colors.text_prim,
    },
    container: {
      backgroundColor: Colors.bg_surface,
      alignItems: "center",
      flexDirection: "row",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: Colors.border_act,
    },
  })

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          cursorColor={Colors.text_sec}
          autoCapitalize={title === "E-mail" ? "none" : "sentences"}
          autoComplete={title === "E-mail" ? "email" : "off"}
          placeholderTextColor={Colors.text_tert}
          value={value}
          onChangeText={onChange}
          multiline={multiline}
          numberOfLines={5}
          keyboardType={number ? "numeric" : "default"}
          style={{
            color: Colors.text_prim,
            flex: 1,
            fontWeight: "500",
          }}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") && !isShow
          }
        />
        {title === "Password" || title === "Confirm Password" ? (
          <TouchableOpacity
            onPress={() => setIsShow(!isShow)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isShow ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={Colors.text_sec}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            name={iconName as keyof typeof Ionicons.glyphMap}
            size={20}
            color={Colors.text_sec}
          />
        )}
      </View>
    </View>
  )
}

export default InputField
