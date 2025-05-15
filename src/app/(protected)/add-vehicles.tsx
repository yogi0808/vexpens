import AvoidKeyboard from "@components/AvoidKeyboard"
import Button from "@components/Button"
import DropDown from "@components/DropDown"
import InputField from "@components/InputField"
import TitleWithSubtitle from "@components/TitleWithSubtitle"
import { useAuth } from "@context/authContext"
import { useTheme } from "@context/themeContext"
import { dropdownDataForVehicleType } from "@data/index"
import { Vehicle } from "@utils/types"
import { validateData } from "@utils/utils"
import { serverTimestamp } from "firebase/firestore"
import React, { useState } from "react"
import { Alert, StyleSheet, Switch, Text, View } from "react-native"
import useUploadData from "../../hooks/useUploadData"

const AddVehicles = () => {
  const [form, setForm] = useState<Vehicle>({
    name: "",
    number: "",
    incomeGenerating: false,
    type: "",
  })

  const { Colors } = useTheme()
  const { user } = useAuth()
  const { loading, createDocument } = useUploadData()

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

  const onSubmit = async () => {
    const isValid = validateData("vehicle", form)
    if (isValid !== true) {
      return Alert.alert("Add Vehicle", isValid.toString())
    }

    const res = await createDocument("vehicles", {
      userUid: user?.uid,
      name: form.name,
      type: form.type,
      incomeGenerating: form.incomeGenerating,
      number: form.number,
      createdAt: serverTimestamp(),
    })

    if (!res.success) {
      return Alert.alert("Add Vehicle", res.msg)
    }

    Alert.alert("Add Vehicle", "Vehicle Added Successfully.")
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
            thumbColor={form.incomeGenerating ? Colors.p : Colors.border_def}
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
          disabled={loading}
        />
      </View>
    </AvoidKeyboard>
  )
}

export default AddVehicles
