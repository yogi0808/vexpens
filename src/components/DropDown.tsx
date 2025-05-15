import { useTheme } from "@context/themeContext"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown"

interface DropDownProp {
  title: string
  placeholder: string
  value: string
  dropdownData: { label: string; value: string }[]
  onChange: (t: any) => void
  search?: boolean
}

const DropDown: React.FC<DropDownProp> = ({
  title,
  value,
  placeholder,
  dropdownData,
  onChange,
  search = false,
}) => {
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
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: Colors.border_act,
    },
    search: {
      borderRadius: 8,
      color: Colors.text_prim,
      borderColor: Colors.border_act,
    },
  })

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Dropdown
        data={dropdownData}
        containerStyle={{
          backgroundColor: Colors.bg_muted,
          borderColor: Colors.border_dis,
          borderRadius: 20,
          elevation: 5,
          marginTop: 10,
          padding: 5,
        }}
        iconColor={Colors.text_sec.toString()}
        itemContainerStyle={{ borderRadius: 8 }}
        activeColor={Colors.p_disabled.toString()}
        itemTextStyle={{ fontWeight: "500", color: Colors.text_sec }}
        selectedTextStyle={{ fontWeight: "500", color: Colors.text_prim }}
        placeholderStyle={{
          left: 5,
          color: Colors.text_tert,
          fontWeight: "400",
        }}
        iconStyle={{ width: 30, height: 30 }}
        searchPlaceholderTextColor={Colors.text_tert.toString()}
        style={styles.container}
        inputSearchStyle={styles.search}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        search={search}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
      />
    </View>
  )
}

export default DropDown
