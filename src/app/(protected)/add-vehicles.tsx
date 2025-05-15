import AvoidKeyboard from "@components/AvoidKeyboard"
import Button from "@components/Button"
import DropDown from "@components/DropDown"
import InputField from "@components/InputField"
import TitleWithSubtitle from "@components/TitleWithSubtitle"
import { useTheme } from "@context/themeContext"
import { dropdownDataForVehicleType } from "@data/index"
import { Vehicle } from "@utils/types"
import React, { useState } from "react"
import { StyleSheet, Switch, Text, View } from "react-native"

const AddVehicles = () => {
  const [form, setForm] = useState<Vehicle>({
    name: "",
    number: "",
    incomeGenerating: false,
    type: "",
  })

  const { Colors } = useTheme()

  const styles = StyleSheet.create({
    form: {
      paddingVertical: 30,
      gap: 20,
    },
    dropdown: {
      backgroundColor: "#C4C4C433",
      alignItems: "center",
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: Colors.p,
    },
    search: {
      borderRadius: 8,
      borderColor: Colors.p,
    },
  })

  const onSubmit = () => {
    console.log(form)
  }

  return (
    <AvoidKeyboard>
      <View style={styles.form}>
        <TitleWithSubtitle
          title="Add a New Vehicle"
          subtitle="Enter your vehicle details below."
        />
        <InputField
          title="Vehicle Name"
          placeholder="Enter Vehicle name."
          value={form.name}
          onChange={(t) => setForm({ ...form, name: t })}
          iconName="car-sport-outline"
        />
        <DropDown
          title="Type"
          onChange={({ value }) => setForm({ ...form, type: value })}
          placeholder="Select the Type."
          value={form.type}
          dropdownData={dropdownDataForVehicleType}
          search
        />
        <InputField
          title="Vehicle Number"
          placeholder="Enter Vehicle Number."
          value={form.number}
          onChange={(t) => setForm({ ...form, number: t })}
          iconName="clipboard-outline"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: Colors.text_prim,
            }}
          >
            Use this Vehicle for Income:{" "}
          </Text>
          <Switch
            style={{ width: 50 }}
            value={form.incomeGenerating}
            trackColor={{
              true: Colors.p_disabled,
              false: Colors.border_dis,
            }}
            thumbColor={form.incomeGenerating ? Colors.p : Colors.p_disabled}
            onValueChange={() =>
              setForm({
                ...form,
                incomeGenerating: !form.incomeGenerating,
              })
            }
          />
        </View>
        <Button
          text="Add Vehicle"
          style={{
            marginTop: 20,
          }}
          onPress={onSubmit}
        />
      </View>
    </AvoidKeyboard>
  )
}

export default AddVehicles
